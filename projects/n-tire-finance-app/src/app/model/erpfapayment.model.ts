export class erpfapayment {
public paymentiddesc :string;public paymentid :number;public paymentdate :Date;public paymentreference :string;public partytype :string;public partytypedesc :string;public partyid :number;public totalpayable :string;public approvedamount :string;public bankaccountid :number;public bankaccountiddesc :string;public paymentmode :string;public onhold :boolean;public remittosupplier :boolean;public duedate :Date;public instrumentno :string;public instrumentdate :Date;public narration :string;public receiptreference :string;public transactiondate :Date;public paymenttype :string;public paymenttypedesc :string;public transactionreference :string;public bankstatus :string;public bankstatusdesc :string;public customfield :string;public attachment :string;public status :string;public DeletederpfapaymentdetailIDs :string;
constructor() {}
}
export interface IerpfapaymentResponse {
total: number;
results: erpfapayment[];
}

