export class erpmaterialissue {
    public branchid: number; public issuetype: string; public referenceid: number; public miid: number; public itemid: number; public uom: number; public locationid: number; public binlocationid: number; public requestedqty: string; public issueqty: string; public serialbatch: string; public status: string;
    constructor() { }
}
export interface IerpmaterialissueResponse {
    total: number;
    results: erpmaterialissue[];
}

