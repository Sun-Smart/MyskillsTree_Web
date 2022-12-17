export class legaltaskmaster {
public taskiddesc :string;public taskid :number;public caseid :number;public caseiddesc :string;public taskdate :Date;public customerid :number;public customeriddesc :string;public description :string;public taskcategory :string;public taskcategorydesc :string;public tasktype :number;public tasktypedesc :string;public tasksubtype :number;public tasksubtypedesc :string;public priority :string;public prioritydesc :string;public assignedto :string;public estimatedhrs :string;public startdate :Date;public target :Date;public billable :boolean;public ratetype :string;public ratetypedesc :string;public rate :number;public taskstatus :string;public taskstatusdesc :string;public taskstarted :boolean;public remarks :string;public attachment :string;public status :string;public DeletedlegaltaskresponseIDs :string;
constructor() {}
}
export interface IlegaltaskmasterResponse {
total: number;
results: legaltaskmaster[];
}

