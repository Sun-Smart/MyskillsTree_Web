export class lmsopportunityproduct {
public branchid :number;public leadid :number;public campaignid :number;public opportunityid :number;public opportunityiddesc :string;public opportunityproductiddesc :string;public opportunityproductid :number;public productid :number;public productiddesc :string;public quantity :number;public uom :string;public uomdesc :string;public price :number;public totalprice :number;public status :string;
constructor() {}
}
export interface IlmsopportunityproductResponse {
total: number;
results: lmsopportunityproduct[];
}

