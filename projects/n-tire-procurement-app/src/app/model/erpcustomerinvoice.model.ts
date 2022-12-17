export class erpcustomerinvoice {
public branchid :number;public branchiddesc :string;public invoiceiddesc :string;public invoiceid :number;public customerid :number;public customeriddesc :string;public invoicenumber :string;public invoicedate :Date;public invoicedetails :string;public customerreference :string;public challanno :string;public invoicecurrency :string;public totalitemvalue :number;public discount :number;public tax1 :number;public tax2 :number;public totalcharges :number;public tds :number;public invoiceamount :string;public duedate :Date;public paymentterms :string;public paymenttermsdesc :string;public creditdays :string;public creditdaysdesc :string;public receiveddate :Date;public receiptreference :string;public receivedamount :string;public receivedcurrency :string;public outstandingamount :string;public basecurrency :string;public basecurrencydesc :string;public baseamount :number;public accountid :number;public accountiddesc :string;public costcenter :number;public costcenterdesc :string;public assigntofinanceuserid :number;public assigntofinanceuseriddesc :string;public remarks :string;public status :string;public soid :number;public DeletederpcustomerinvoicedetailIDs :string;
constructor() {}
}
export interface IerpcustomerinvoiceResponse {
total: number;
results: erpcustomerinvoice[];
}

