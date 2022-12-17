export class lmsscoringfixedfieldspositive {
    public productgroupid: number; public lsfpiddesc: string; public lsfpid: number; public field: string; public value: string; public point: number; public status: string;
    constructor() { }
}
export interface IlmsscoringfixedfieldspositiveResponse {
    total: number;
    results: lmsscoringfixedfieldspositive[];
}

