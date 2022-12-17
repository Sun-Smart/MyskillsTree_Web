export class borisk {
public riskiddesc :string;public riskid :number;public sourcefield :string;public sourcereference :number;public hasrisk :boolean;public details :string;public riskstatus :string;public riskstatusdesc :string;public impact :string;public impactdesc :string;public notes :string;public status :string;
constructor() {}
}
export interface IboriskResponse {
total: number;
results: borisk[];
}

