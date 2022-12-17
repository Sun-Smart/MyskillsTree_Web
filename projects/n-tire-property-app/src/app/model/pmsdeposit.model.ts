export class pmsdeposit {
public depositiddesc :string;public depositid :number;public leaseid :number;public leaseiddesc :string;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public tenantid :number;public tenantiddesc :string;public ownerid :number;public owneriddesc :string;public deposittype :string;public deposittypedesc :string;public depositamount :number;public depositduedate :Date;public paid :boolean;public paiddate :Date;public paidamount :number;public paymenttype :string;public paymenttypedesc :string;public chequenumber :string;public chequedate :Date;public bankname :string;public txnreference :string;public txndate :Date;public txnbank :string;public notes :string;public status :string;
constructor() {}
}
export interface IpmsdepositResponse {
total: number;
results: pmsdeposit[];
}

