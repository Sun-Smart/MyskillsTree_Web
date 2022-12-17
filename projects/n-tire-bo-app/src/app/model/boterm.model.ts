export class boterm {
public termiddesc :string;public termid :number;public description :string;public details :string;public sourcefield :string;public sourcereference :number;public sequence :number;public status :string;
constructor() {}
}
export interface IbotermResponse {
total: number;
results: boterm[];
}

