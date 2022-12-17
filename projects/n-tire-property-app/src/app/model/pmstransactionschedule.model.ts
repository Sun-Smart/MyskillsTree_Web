export class pmstransactionschedule {
public transactionscheduleiddesc :string;public transactionscheduleid :number;public leaseid :number;public leaseiddesc :string;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public tenantid :number;public tenantiddesc :string;public ownerid :number;public owneriddesc :string;public categoryid :number;public categoryiddesc :string;public subcategoryid :number;public subcategoryiddesc :string;public amount :number;public frequency :string;public frequencydesc :string;public firstinvoicedate :Date;public notes :string;public status :string;
constructor() {}
}
export interface IpmstransactionscheduleResponse {
total: number;
results: pmstransactionschedule[];
}

