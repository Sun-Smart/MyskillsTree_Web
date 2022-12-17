export class erpfacustomerreceipt {
public receiptiddesc :string;public receiptid :number;public receiptdate :Date;public receiptreference :string;public customerid :number;public customeriddesc :string;public receivedamount :number;public bankaccountid :number;public bankaccountiddesc :string;public receiptmode :string;public chequeno :string;public chequedate :Date;public narration :string;public status :string;public customerpaymentreference :string;public DeletederpfacustomerreceiptdetailIDs :string;
constructor() {}
}
export interface IerpfacustomerreceiptResponse {
total: number;
results: erpfacustomerreceipt[];
}

