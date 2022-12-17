export class lmsproductmaster {
public productiddesc :string;public productid :number;public productgroup :string;public productgroupdesc :string;public productcode :string;public productname :string;public productimage :string;public description :string;public dimension :string;public details :string;public bundleproduct :boolean;public productowner :string;public validfrom :Date;public validto :Date;public customfield :string;public attachment :string;public status :string;public DeletedlmsbundledproductIDs :string;
constructor() {}
}
export interface IlmsproductmasterResponse {
total: number;
results: lmsproductmaster[];
}

