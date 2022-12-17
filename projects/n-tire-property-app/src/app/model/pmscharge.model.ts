export class pmscharge {
public chargeiddesc :string;public chargeid :number;public leaseid :number;public leaseiddesc :string;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public tenantid :number;public tenantiddesc :string;public ownerid :number;public owneriddesc :string;public datecharged :Date;public chargecycle :string;public chargecycledesc :string;public chargetype :string;public chargetypedesc :string;public consumption :number;public chargeamount :number;public duedate :Date;public paiddate :Date;public paidamount :number;public paidmode :string;public paidmodedesc :string;public paidreference :string;public nextduedate :Date;public notes :string;public status :string;
constructor() {}
}
export interface IpmschargeResponse {
total: number;
results: pmscharge[];
}

