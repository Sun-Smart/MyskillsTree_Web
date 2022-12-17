export class bofact {
public factiddesc :string;public factid :number;public sourcefield :string;public sourcereference :number;public notes :string;public feedback :boolean;public customfield :string;public attachment :string;public status :string;public DeletedbonotifierIDs :string;
constructor() {}
}
export interface IbofactResponse {
total: number;
results: bofact[];
}

