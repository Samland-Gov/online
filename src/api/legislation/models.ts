export interface Work {
    default_expression: Expression | undefined;
    frbrUri: string;
    title: string;
    metadata: any;
    expressions: Expression[];
}

export interface Expression {
    work: Work;
    frbrUri: string;
    title: string;
    languageCode: string;
    date: string;
    content: string;
    tocJson: any;
}
