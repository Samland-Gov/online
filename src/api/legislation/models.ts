export interface Work {
    default_expression: Expression | undefined;
    frbrUri: string;
    title: string;
    metadata: WorkMetadata;
    expressions: Expression[];
}

export interface WorkMetadata {
    publication_date: string;
    publication_name: string;
    publication_number: string;
    expression_date?: string;
    commencement_date?: string;
    assent_date?: string;
    work_amendments: Amendment[];
    parent_work?: ParentWork;
    date: string;
}

export interface ParentWork {
    frbr_uri: string;
    title: string;
}

export interface Amendment {
    date: string | Date;
    amending_title: string;
    amending_uri: string;
}

export interface Publication {
    date: Date;
    name: string;
    number: string;
}

export interface PointInTime {
    type: "publication" | "commencement" | "assent" | "amendment" | "amended" | "repealed";
    date: Date;
    linkedObject?: Publication | Amendment | ParentWork;
}

export interface TocNodeData {
    title: string;
    id: string;
    children?: TocNodeData[];
};

export interface Expression {
    work: Work;
    frbrUri: string;
    title: string;
    languageCode: string;
    date: string;
    content: string;
    tocJson: {
        toc: TocNodeData[]
    };
}
