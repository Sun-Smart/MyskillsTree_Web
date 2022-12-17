export class erpsalesorderdetail {
public sodetailiddesc :string;public sodetailid :number;public versionnumber :number;public soid :number;public soiddesc :string;public customerid :number;public detailtype :string;public detailtypedesc :string;public itemid :number;public itemiddesc :string;public description :string;public details :string;public quantity :number;public uom :string;public uomdesc :string;public currency :string;public currencydesc :string;public unitprice :string;public discountpercent :number;public discounttype :string;public discounttypedesc :string;public discountvalue :number;public saleprice :number;public tax1name :number;public tax1namedesc :string;public tax1value :string;public tax2name :number;public tax2namedesc :string;public tax2value :string;public othercharges :string;public totalvalue :string;public basecurrency :string;public basecurrencydesc :string;public basevalue :string;public expecteddelivery :Date;public size :string;public color :string;public weight :string;public notes :string;public paymenttermtype :boolean;public remarks :string;public status :string;
constructor() {}
}
export interface IerpsalesorderdetailResponse {
total: number;
results: erpsalesorderdetail[];
}

