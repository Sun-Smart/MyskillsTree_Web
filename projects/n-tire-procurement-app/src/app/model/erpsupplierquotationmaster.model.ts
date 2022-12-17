export class erpsupplierquotationmaster {
public rfqid :number;public rfqiddesc :string;public rfqreference :string;public quotationiddesc :string;public quotationid :number;public supplierid :number;public supplieriddesc :string;public quotationreference :string;public versionnumber :number;public quotationdate :Date;public rfqreleaseddate :Date;public expirationdate :Date;public currency :string;public currencydesc :string;public quotationamount :string;public discountpercent :string;public shipto :number;public shiptodesc :string;public billto :number;public billtodesc :string;public freightterms :string;public freighttermsdesc :string;public paymentterms :string;public paymenttermsdesc :string;public quotationremarks :string;public batchid :string;public status :string;public statusremarks :string;public DeletederpquotationpaymenttermIDs :string;public DeletederpsupplierquotationdetailIDs :string;
constructor() {}
}
export interface IerpsupplierquotationmasterResponse {
total: number;
results: erpsupplierquotationmaster[];
}

