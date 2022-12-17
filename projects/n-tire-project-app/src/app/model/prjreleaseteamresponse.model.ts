export class prjreleaseteamresponse {
public responseiddesc :string;public responseid :number;public checklistitem :string;public checklistitemdesc :string;public currentstatus :string;public currentstatusdesc :string;public assignedto :string;public responses :string;public status :string;
constructor() {}
}
export interface IprjreleaseteamresponseResponse {
total: number;
results: prjreleaseteamresponse[];
}

