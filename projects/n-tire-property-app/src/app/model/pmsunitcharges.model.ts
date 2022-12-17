export class pmsunitcharges {
public chargeiddesc :string;public chargeid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public ownerid :number;public owneriddesc :string;public chargecycle :string;public chargecycledesc :string;public chargetype :string;public chargetypedesc :string;public chargeamount :number;public validstartdate :Date;public validenddate :Date;public notes :string;public status :string;
constructor() {}
}
export interface IpmsunitchargesResponse {
total: number;
results: pmsunitcharges[];
}

