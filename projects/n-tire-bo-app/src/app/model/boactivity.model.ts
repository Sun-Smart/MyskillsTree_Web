export class boactivity {
public activityiddesc :string;public activityid :number;public activitytype :string;public activitytypedesc :string;public referenceid :number;public description :string;public startdate :Date;public enddate :Date;public duedate :Date;public estimatedtime :string;public actualtimetaken :string;public priority :string;public prioritydesc :string;public assignedto :string;public assignedby :number;public assignedbydesc :string;public assigneddate :Date;public contactpersonid :number;public contactpersoniddesc :string;public details :string;public activitystatus :string;public activitystatusdesc :string;public remarks :string;public customfield :string;public attachment :string;public status :string;public sourcefield :string;public sourcereference :number;
constructor() {}
}
export interface IboactivityResponse {
total: number;
results: boactivity[];
}

