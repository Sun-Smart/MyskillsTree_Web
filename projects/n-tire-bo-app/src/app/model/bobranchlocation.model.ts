export class bobranchlocation {
public branchid :number;public locationiddesc :string;public locationid :number;public locationcode :string;public locationcodedesc :string;public locationname :string;public tag :string;public status :string;public DeletedbobranchsublocationIDs :string;
constructor() {}
}
export interface IbobranchlocationResponse {
total: number;
results: bobranchlocation[];
}

