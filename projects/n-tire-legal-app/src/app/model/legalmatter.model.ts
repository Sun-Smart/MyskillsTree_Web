export class legalmatter {
public matteriddesc :string;public matterid :number;public branchid :number;public branchiddesc :string;public mattertype :number;public mattertypedesc :string;public subject :string;public description :string;public assignedto :string;public target :Date;public billable :boolean;public attachment :string;public status :string;public DeletedlegalmatterresponseIDs :string;
constructor() {}
}
export interface IlegalmatterResponse {
total: number;
results: legalmatter[];
}

