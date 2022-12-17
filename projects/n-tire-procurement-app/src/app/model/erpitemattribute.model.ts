export class erpitemattribute {
public itemattributeiddesc :string;public itemattributeid :number;public itemid :number;public itemiddesc :string;public optionid :number;public optioniddesc :string;public valueid :number;public valueiddesc :string;public price :number;public priceprefix :string;public priceprefixdesc :string;public status :string;
constructor() {}
}
export interface IerpitemattributeResponse {
total: number;
results: erpitemattribute[];
}

