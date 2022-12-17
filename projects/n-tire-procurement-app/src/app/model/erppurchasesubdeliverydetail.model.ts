export class erppurchasesubdeliverydetail {
public branchid :number;public poid :number;public poiddesc :string;public subdeliveryiddesc :string;public subdeliveryid :number;public supplierid :number;public supplieriddesc :string;public versionnumber :number;public podetailid :number;public podetailiddesc :string;public itemid :number;public itemiddesc :string;public uom :string;public uomdesc :string;public quantity :number;public deliveryaddress1 :string;public deliveryaddress2 :string;public deliverycountry :number;public deliverycountrydesc :string;public deliverystate :number;public deliverystatedesc :string;public deliverycity :number;public deliverycitydesc :string;public deliverypin :string;public deliverylatlong :string;public deliverydate :Date;public status :string;
constructor() {}
}
export interface IerppurchasesubdeliverydetailResponse {
total: number;
results: erppurchasesubdeliverydetail[];
}

