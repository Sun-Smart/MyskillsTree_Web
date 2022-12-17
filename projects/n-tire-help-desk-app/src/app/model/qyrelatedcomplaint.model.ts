export class qyrelatedcomplaint {
public relatediddesc :string;public relatedid :number;public complaintid :number;public relatedcomplaintid :number;public comments :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IqyrelatedcomplaintResponse {
total: number;
results: qyrelatedcomplaint[];
}

