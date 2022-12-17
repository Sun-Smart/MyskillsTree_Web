export class erpproductattribute {
public productattributeiddesc :string;public productattributeid :number;public productid :number;public productiddesc :string;public optionid :number;public optioniddesc :string;public valueid :number;public valueiddesc :string;public price :number;public priceprefix :string;public priceprefixdesc :string;public status :string;
constructor() {}
}
export interface IerpproductattributeResponse {
total: number;
results: erpproductattribute[];
}

