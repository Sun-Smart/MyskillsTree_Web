export class pmsworkorder {
public workorderiddesc :string;public workorderid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public workorderno :string;public tenantid :number;public tenantiddesc :string;public scheduleid :number;public description :string;public details :string;public workordertype :string;public workordertypedesc :string;public workorderfrequency :string;public workorderfrequencydesc :string;public recurringstartdate :Date;public recurringenddate :Date;public noenddate :boolean;public priority :string;public prioritydesc :string;public invoiceno :string;public totalamount :number;public suggestedperson :string;public responsibleid :number;public responsibleiddesc :string;public visittype :string;public visittypedesc :string;public visitdate :Date;public visittime :string;public duedate :Date;public leaseid :number;public ownerid :number;public owneriddesc :string;public attachment :string;public status :string;public DeletedpmsworkorderdetailIDs :string;
constructor() {}
}
export interface IpmsworkorderResponse {
total: number;
results: pmsworkorder[];
}

