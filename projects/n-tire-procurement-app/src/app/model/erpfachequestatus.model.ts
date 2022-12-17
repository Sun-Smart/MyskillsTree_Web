export class erpfachequestatus {
    public txnid: number; public bankid: number; public bankiddesc: string; public chequenumber: number; public issuedate: Date; public party: string; public amount: number; public remarks: string; public status: string; public statusdesc: string;
    constructor() { }
}
export interface IerpfachequestatusResponse {
    total: number;
    results: erpfachequestatus[];
}

