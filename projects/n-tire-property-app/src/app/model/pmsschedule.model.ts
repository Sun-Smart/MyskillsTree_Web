export class pmsschedule {
public scheduleiddesc :string;public scheduleid :number;public propertyid :number;public propertyiddesc :string;public tenantid :number;public tenantiddesc :string;public unitid :number;public unitiddesc :string;public ownerid :number;public owneriddesc :string;public description :string;public details :string;public workordertype :string;public workordertypedesc :string;public workorderfrequency :string;public workorderfrequencydesc :string;public recurringstartdate :Date;public noenddate :boolean;public recurringenddate :Date;public priority :string;public prioritydesc :string;public attachment :string;public status :string;
constructor() {}
}
export interface IpmsscheduleResponse {
total: number;
results: pmsschedule[];
}

