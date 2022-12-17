export class erpfacustomerreceiptdetail {
public receiptdetailiddesc :string;public receiptdetailid :number;public receiptid :number;public receiptdetails :string;public invoiceid :number;public invoiceiddesc :string;public customerreference :string;public invoicedate :Date;public totalvalue :number;public discountamount :number;public tax1 :number;public tax2 :number;public taxdeduction :number;public othercharges :number;public invoiceamount :number;public paid :number;public balance :number;public narration :string;public status :string;
constructor() {}
}
export interface IerpfacustomerreceiptdetailResponse {
total: number;
results: erpfacustomerreceiptdetail[];
}

