export class boworkflowmaster {
public workflowmasteriddesc :string;public workflowmasterid :number;public description :string;public menucode :string;public menucodedesc :string;public tablecode :string;public tablecodedesc :string;public workflowhtml :string;public status :string;public DeletedboworkflowIDs :string;public DeletedboworkflowstepIDs :string;
constructor() {}
}
export interface IboworkflowmasterResponse {
total: number;
results: boworkflowmaster[];
}

