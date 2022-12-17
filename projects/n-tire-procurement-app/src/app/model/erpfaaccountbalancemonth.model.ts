export class erpfaaccountbalancemonth {
    public balmonthid: number; public finyear: number; public finyeardesc: string; public periodid: number; public periodiddesc: string; public accountid: number; public accountiddesc: string; public openbalance: number; public totalcredit: number; public totaldebit: number; public closingbalance: number; public status: string;
    constructor() { }
}
export interface IerpfaaccountbalancemonthResponse {
    total: number;
    results: erpfaaccountbalancemonth[];
}

