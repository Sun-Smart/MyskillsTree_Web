export class bouserbranchaccess {
    public accessiddesc: string; public accessid: number; public branchid: number; public userid: number; public status: string;
    constructor() { }
}
export interface IbouserbranchaccessResponse {
    total: number;
    results: bouserbranchaccess[];
}

