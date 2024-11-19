import {type Work, type Expression} from './models'

const api_url = 'https://legislation.minersonline.uk/api/v3/akn/zl/.json';
const default_language_code = "en";

export async function request_with_token(url: string) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `token ${import.meta.env.PRIVATE_INDIGO_API_KEY}`
        },
    });
      
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response;
}


export async function pull_works(): Promise<Work[]> {
    let works = [] as Work[];
    let url = api_url;
    while (url != null) {
        let resp = await (await request_with_token(url)).json();
        for (const result of resp["results"]) {
            const expressions = [] as Expression[];
            const work: Work = {
                frbrUri: result['frbr_uri'],
                title: result['title'],
                metadata: result,
                expressions: expressions
            };
            for (const date of result["points_in_time"]) {
                for (const expression of date["expressions"]) {
                    await create_expression(expression, work);
                }
            }
            works.push(work);
        }

        url = resp["next"];
    }
    return works;
}


async function create_expression(data: any, work: Work) {
    const expression: Expression = {
        work: work,
        frbrUri: data['expression_frbr_uri'],
        title: data['title'],
        languageCode: data['language'],
        date: data['expression_date'],
        content: await (await request_with_token(`${data["url"]}.html`)).text(),
        tocJson: await (await request_with_token(`${data["url"]}/toc.json`)).json()
    };
    work.expressions.push(expression);
}

export function default_expression(work: Work): Expression | undefined {
    const expression = work.expressions.filter((work) => {
        if (work.languageCode == default_language_code) {
            return true;
        }
        return false;
    })[0]
    if (expression == undefined) {
        return work.expressions[0]
    }
    return undefined
}