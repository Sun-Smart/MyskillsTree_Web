export class erpgoodsreceiptdetail {
public branchid :number;public grnid :number;public grniddesc :string;public grndetailsiddesc :string;public grndetailsid :number;public itemid :number;public itemiddesc :string;public uom :string;public uomdesc :string;public popendingqty :string;public deliveredqty :string;public storagelocationid :number;public storagelocationiddesc :string;public storagedetails :string;public rejectedqty :string;public acceptedqty :number;public invoicedqty :number;public invoicedamount :number;public supplierinvoiceid :number;public supplierinvoiceiddesc :string;public supplierinvoiceqty :number;public supplierinvoiceamount :number;public remarks :string;public status :string;
constructor() {}
}
export interface IerpgoodsreceiptdetailResponse {
total: number;
results: erpgoodsreceiptdetail[];
}

