import {type Work, type Expression, PointInTime} from './models'

// const api_url = 'https://legislation.minersonline.uk/api/v3/akn/zl/.json';
// const default_language_code = "en";

export class IndigoClient {
    base_url: string;
    api_token: string;
    default_language_code: string;

    constructor (base_url: string, api_token: string, default_language_code: string) {
        this.base_url = base_url;
        this.api_token = api_token;
        this.default_language_code = default_language_code;
    }

    private async request_with_token(url: string, timeout: number = 500) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `token ${this.api_token}`
                },
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            return response;
        } catch (error) {
            if ((error as Error).name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        } finally {
            clearTimeout(id);
        }
    }

    private async create_expression(data: Record<string, string>, work: Work) {
        const expression: Expression = {
            work: work,
            frbrUri: data['expression_frbr_uri'],
            title: data['title'],
            languageCode: data['language'],
            date: data['expression_date'],
            content: await (await this.request_with_token(`${data["url"]}.html`)).text(),
            tocJson: await (await this.request_with_token(`${data["url"]}/toc.json`)).json()
        };
        work.expressions.push(expression);
    }

    public async pull_works(): Promise<Work[]> {
        const works = [] as Work[];
        let url = this.base_url;
        while (url != null) {
            const resp = await (await this.request_with_token(url)).json();
            for (const result of resp["results"]) {
                const expressions = [] as Expression[];
                const work: Work = {
                    frbrUri: result['frbr_uri'],
                    title: result['title'],
                    metadata: result,
                    expressions: expressions,
                    default_expression: undefined
                };
                for (const date of result["points_in_time"]) {
                    for (const expression of date["expressions"]) {
                        await this.create_expression(expression, work);
                    }
                }
                work.default_expression = this.default_expression(work);
                works.push(work);
            }
    
            url = resp["next"];
        }
        return works;
    }

    public async pull_expressions(): Promise<Expression[]> {
        const expressions = [] as Expression[];
        const works = await this.pull_works();
        for (const work of works) {
            for (const exp of work.expressions) {
                expressions.push(exp);//frbrUri
            }
        }

        return expressions;
    }

    public async pull_expression(frbrUri: string): Promise<Expression | undefined> {
        let expression = undefined;
        const expressions = await this.pull_expressions();
        for (const exp of expressions) {
            if (exp.frbrUri == frbrUri) {
                expression = exp;
                break;
            }
        }

        return expression;
    }
    
    public default_expression(work: Work): Expression | undefined {
        const expression = work.expressions.filter((work) => {
            if (work.languageCode == this.default_language_code) {
                return true;
            }
            return false;
        })[0]
        if (expression == undefined) {
            return work.expressions[0]
        }
        return undefined
    }

    public points_in_time(work: Work): PointInTime[] {
        const points_in_time = [] as PointInTime[];
        if (work.metadata.commencement_date) {
            points_in_time.push({
                type: "commencement",
                date: new Date(work.metadata.commencement_date)
            });
        }
        if (work.metadata.assent_date) {
            points_in_time.push({
                type: "assent",
                date: new Date(work.metadata.assent_date)
            });
        }
        if (work.metadata.publication_date) {
            points_in_time.push({
                type: "publication",
                date: new Date(work.metadata.publication_date),
                linkedObject: {
                    date: new Date(work.metadata.publication_date),
                    name: work.metadata.publication_name,
                    number: work.metadata.publication_number
                }
            });
        }
        return points_in_time.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
}
