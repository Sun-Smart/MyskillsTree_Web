export class hrmspaschedule {
public paiddesc :string;public paid :number;public employeeid :number;public planneddatetime :Date;public actualdatetime :Date;public paround :string;public parounddesc :string;public appraisaluser :number;public appraisaluserdesc :string;public appraisalusercomments :string;public appraisalweightage :number;public status :string;public DeletedhrmspadecisionmanagementIDs :string;public DeletedhrmsparesponseIDs :string;
constructor() {}
}
export interface IhrmspascheduleResponse {
total: number;
results: hrmspaschedule[];
}

