export class erpsupplierquotationdetail {
public rfqid :number;public rfqiddesc :string;public supplierid :number;public supplieriddesc :string;public quotationid :number;public quotationiddesc :string;public quotationdetailiddesc :string;public quotationdetailid :number;public versionnumber :number;public itemid :number;public itemiddesc :string;public uom :string;public uomdesc :string;public quantity :number;public currency :string;public currencydesc :string;public unitprice :string;public discountpercent :string;public tax1name :number;public tax1namedesc :string;public tax1value :string;public tax2name :number;public tax2namedesc :string;public tax2value :string;public othercharges :string;public totalquotevalue :string;public basecurrency :number;public basevalue :string;public expecteddelivery :Date;public paymenttermtype :string;public paymenttermtypedesc :string;public remarks :string;public offerquantity1 :number;public unitprice1 :number;public totalcost1 :number;public offerquantity2 :number;public unitprice2 :number;public totalcost2 :number;public offerquantity3 :number;public unitprice3 :number;public totalcost3 :number;public status :string;
constructor() {}
}
export interface IerpsupplierquotationdetailResponse {
total: number;
results: erpsupplierquotationdetail[];
}

