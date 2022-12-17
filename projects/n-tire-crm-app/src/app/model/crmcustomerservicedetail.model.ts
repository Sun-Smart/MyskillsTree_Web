export class crmcustomerservicedetail {
public serviceid :number;public detailiddesc :string;public detailid :number;public itemid :number;public serialnumber :string;public description :string;public notes :string;public status :string;
constructor() {}
}
export interface IcrmcustomerservicedetailResponse {
total: number;
results: crmcustomerservicedetail[];
}

