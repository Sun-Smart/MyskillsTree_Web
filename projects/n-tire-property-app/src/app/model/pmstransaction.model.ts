export class pmstransaction {
public transactioniddesc :string;public transactionid :number;public transactiondate :Date;public leaseid :number;public leaseiddesc :string;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public ownerid :number;public owneriddesc :string;public tenantid :number;public tenantiddesc :string;public categoryid :number;public categoryiddesc :string;public subcategoryid :number;public subcategoryiddesc :string;public amount :number;public details :string;public transactionscheduleid :number;public paymentmethod :string;public paymentmethoddesc :string;public paymentreference :string;public transactionstatus :string;public transactionstatusdesc :string;public notes :string;public status :string;
constructor() {}
}
export interface IpmstransactionResponse {
total: number;
results: pmstransaction[];
}

