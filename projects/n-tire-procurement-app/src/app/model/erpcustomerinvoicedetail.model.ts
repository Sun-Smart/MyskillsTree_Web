export class erpcustomerinvoicedetail {
public customerid :number;public invoiceid :number;public invoiceiddesc :string;public invoicedetailiddesc :string;public invoicedetailid :number;public itemid :number;public itemiddesc :string;public itemdescription :string;public quantity :number;public uom :string;public uomdesc :string;public currency :string;public currencydesc :string;public unitprice :string;public discountpercent :string;public discountvalue :number;public tax1name :number;public tax1namedesc :string;public tax1value :string;public tax2name :number;public tax2namedesc :string;public tax2value :string;public othercharges :string;public totalvalue :string;public basecurrency :string;public basecurrencydesc :string;public basevalue :string;public soid :number;public sodetailid :number;public sodetailiddesc :string;public paymenttermtype :string;public paymenttermtypedesc :string;public customerporeference :string;public productserialno :string;public remarks :string;public status :string;
constructor() {}
}
export interface IerpcustomerinvoicedetailResponse {
total: number;
results: erpcustomerinvoicedetail[];
}

