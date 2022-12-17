export class erpsupplierinvoice {
public branchid :number;public branchiddesc :string;public invoiceiddesc :string;public invoiceid :number;public supplierid :number;public supplieriddesc :string;public poid :number;public poiddesc :string;public salesorderreference :string;public challanno :string;public challandate :Date;public grnno :string;public grndate :Date;public invoicenumber :string;public invoicedate :Date;public postingdate :Date;public postingtime :string;public totalvalue :number;public taxamount :number;public charges :number;public deductedtaxamount :number;public nettaxamount :number;public additionaldiscountpercentage :number;public additionaldiscountamount :number;public invoiceamount :string;public invoicecurrency :string;public invoicecurrencydesc :string;public duedate :Date;public ispaid :boolean;public isreturned :boolean;public paymentterms :string;public paymenttermsdesc :string;public creditdays :number;public paiddate :Date;public paidreference :string;public paidamount :string;public paidcurrency :string;public basecurrency :string;public basecurrencydesc :string;public baseamount :number;public outstandingamount :string;public terms :string;public remarks :string;public accountid :number;public accountiddesc :string;public costcenter :number;public costcenterdesc :string;public projectid :number;public assigntofinanceuserid :number;public assigntofinanceuseriddesc :string;public status :string;public DeletederpsupplierinvoicedetailIDs :string;
constructor() {}
}
export interface IerpsupplierinvoiceResponse {
total: number;
results: erpsupplierinvoice[];
}

