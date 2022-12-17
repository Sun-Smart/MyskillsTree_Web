export class camsworkrequest {
public requestiddesc :string;public requestid :number;public requestreference :string;public requestdate :Date;public requesttype :string;public requesttypedesc :string;public worktype :string;public worktypedesc :string;public requestorid :number;public requestoriddesc :string;public assetid :number;public assetiddesc :string;public locationid :number;public locationiddesc :string;public sublocationid :number;public sublocationiddesc :string;public details :string;public priority :string;public prioritydesc :string;public criticality :string;public criticalitydesc :string;public requireddate :Date;public datecreated :Date;public datecompleted :Date;public actualtat :string;public remarks :string;public requeststatus :string;public requeststatusdesc :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IcamsworkrequestResponse {
total: number;
results: camsworkrequest[];
}

