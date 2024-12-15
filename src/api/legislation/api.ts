import {type Work, type Expression} from './models'

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

    private async request_with_token(url: string) {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                // Authorization: `token ${import.meta.env.PRIVATE_INDIGO_API_KEY}`
                Authorization: `token ${this.api_token}`
            },
        });
          
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        return response;
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
}
