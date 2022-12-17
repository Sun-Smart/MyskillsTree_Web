export class prjconfigurationitem {
public itemiddesc :string;public itemid :number;public sourcefield :string;public sourcereference :number;public description :string;public type :string;public typedesc :string;public manufacturerdetails :string;public version :number;public locationid :number;public currentstatus :string;public currentstatusdesc :string;public linkeditems :string;public documentationlink :string;public licensedetails :string;public owner :string;public supplier :number;public history :string;public status :string;
constructor() {}
}
export interface IprjconfigurationitemResponse {
total: number;
results: prjconfigurationitem[];
}

