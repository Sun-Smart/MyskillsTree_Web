export class erpfaaccountbalancefinyear {
public baliddesc :string;public balid :number;public finyear :number;public finyeardesc :string;public accountid :number;public accountiddesc :string;public openbalance :number;public totalcredit :number;public totaldebit :number;public closingbalance :number;public status :string;
constructor() {}
}
export interface IerpfaaccountbalancefinyearResponse {
total: number;
results: erpfaaccountbalancefinyear[];
}

