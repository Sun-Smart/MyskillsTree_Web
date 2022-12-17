export class lmsquotepaymentterm {
public paymenttermiddesc :string;public paymenttermid :number;public branchid :number;public leadid :number;public opportunityid :number;public opportunityiddesc :string;public quoteid :number;public quoteiddesc :string;public description :string;public duedate :string;public duedatedesc :string;public invoicepercentage :number;public paymentamount :number;public status :string;
constructor() {}
}
export interface IlmsquotepaymenttermResponse {
total: number;
results: lmsquotepaymentterm[];
}

