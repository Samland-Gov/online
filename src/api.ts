import {type Work, type Expression} from './models'

const api_url = 'https://legislation.minersonline.uk/api/v3/akn/zl/.json';

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
        for (const index in resp["results"]) {
            const data = resp["results"][index];
            const expressions = [] as Expression[];
            const work: Work = {
                frbrUri: data['frbr_uri'],
                title: data['title'],
                metadata: data,
                expressions: expressions
            };
            for (const date of data["points_in_time"]) {
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
        content: await (await request_with_token(`${data["url"]}.xml`)).text(),
        tocJson: await (await request_with_token(`${data["url"]}/toc.json`)).json()
    };
    work.expressions.push(expression);
}