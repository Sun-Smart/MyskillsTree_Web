export class erppurchaseorderdetail {
public poid :number;public poiddesc :string;public supplierid :number;public supplieriddesc :string;public versionnumber :number;public podetailiddesc :string;public podetailid :number;public detailtype :string;public detailtypedesc :string;public itemid :number;public itemiddesc :string;public description :string;public details :string;public quantity :number;public uom :string;public uomdesc :string;public currency :string;public currencydesc :string;public unitprice :string;public discountpercent :number;public discounttype :string;public discounttypedesc :string;public saleprice :number;public tax1name :number;public tax1namedesc :string;public tax1value :string;public tax2name :number;public tax2value :string;public othercharges :string;public totalquotevalue :string;public basecurrency :number;public basevalue :string;public expecteddelivery :Date;public size :string;public color :string;public weight :string;public notes :string;public paymenttermtype :boolean;public remarks :string;public status :string;public DeletederppurchasesubdeliverydetailIDs :string;
constructor() {}
}
export interface IerppurchaseorderdetailResponse {
total: number;
results: erppurchaseorderdetail[];
}

