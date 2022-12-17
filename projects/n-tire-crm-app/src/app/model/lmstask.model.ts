export class lmstask {
public leadid :number;public leadiddesc :string;public opportunityid :number;public opportunityiddesc :string;public taskiddesc :string;public taskid :number;public subject :string;public description :string;public assignto :number;public assigntodesc :string;public assigneddate :Date;public targetdate :Date;public priority :string;public prioritydesc :string;public actualcloseddate :Date;public taskstatus :string;public taskstatusdesc :string;public performancestatus :string;public performancestatusdesc :string;public productid :number;public productiddesc :string;public customfield :string;public attachment :string;public status :string;public DeletedlmstaskresponseIDs :string;
constructor() {}
}
export interface IlmstaskResponse {
total: number;
results: lmstask[];
}

