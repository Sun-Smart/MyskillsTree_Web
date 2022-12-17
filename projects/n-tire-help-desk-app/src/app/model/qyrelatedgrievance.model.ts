export class qyrelatedgrievance {
public relatediddesc :string;public relatedid :number;public grievanceid :number;public grievanceiddesc :string;public relatedgrievanceid :number;public relatedgrievanceiddesc :string;public comments :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IqyrelatedgrievanceResponse {
total: number;
results: qyrelatedgrievance[];
}

