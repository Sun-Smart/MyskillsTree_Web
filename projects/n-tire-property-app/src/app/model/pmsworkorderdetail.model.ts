export class pmsworkorderdetail {
public workorderdetailiddesc :string;public workorderdetailid :number;public workorderid :number;public workorderiddesc :string;public propertyid :number;public propertyiddesc :string;public description :string;public quantity :number;public amounteach :number;public totalamount :number;public status :string;
constructor() {}
}
export interface IpmsworkorderdetailResponse {
total: number;
results: pmsworkorderdetail[];
}

