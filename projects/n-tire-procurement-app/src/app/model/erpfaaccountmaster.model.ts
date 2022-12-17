export class erpfaaccountmaster {
    public accountid: number; public accountcode: string; public accountname: string; public parentaccount: number; public parentaccountdesc: string; public accounttype: string; public accounttypedesc: string; public transactionlimit: number; public remarks: string; public bankaccount: boolean; public status: string;
    constructor() { }
}
export interface IerpfaaccountmasterResponse {
    total: number;
    results: erpfaaccountmaster[];
}

