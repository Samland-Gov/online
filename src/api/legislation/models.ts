export interface Work {
    default_expression: Expression | undefined;
    frbrUri: string;
    title: string;
    metadata: unknown;
    expressions: Expression[];
}

interface NodeData {
    title: string;
    id: string;
    children?: NodeData[];
};

export interface Expression {
    work: Work;
    frbrUri: string;
    title: string;
    languageCode: string;
    date: string;
    content: string;
    tocJson: {
        toc: NodeData[]
    };
}
