export class erpcontractorderdetail {
public contractid :number;public contractiddesc :string;public supplierid :number;public supplieriddesc :string;public versionnumber :number;public contractdetailiddesc :string;public contractdetailid :number;public detailtype :string;public detailtypedesc :string;public itemid :number;public itemiddesc :string;public service :string;public quantity :number;public uom :string;public uomdesc :string;public currency :string;public currencydesc :string;public unitprice :string;public discountpercent :number;public discounttype :string;public discounttypedesc :string;public saleprice :number;public tax1name :number;public tax1namedesc :string;public tax1value :string;public tax2name :number;public tax2namedesc :string;public tax2value :string;public othercharges :string;public totalquotevalue :string;public basecurrency :number;public basecurrencydesc :string;public basevalue :string;public size :string;public color :string;public weight :string;public expecteddelivery :Date;public paymenttermtype :string;public paymenttermtypedesc :string;public notes :string;public remarks :string;public status :string;
constructor() {}
}
export interface IerpcontractorderdetailResponse {
total: number;
results: erpcontractorderdetail[];
}

