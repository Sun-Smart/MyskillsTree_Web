export class lmsproductnoaccess {
    constructor(public accessid: number, public productid: number, public branchid: number, public status: string) { }
}
export interface IlmsproductnoaccessResponse {
    total: number;
    results: lmsproductnoaccess[];
}

