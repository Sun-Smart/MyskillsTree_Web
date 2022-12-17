export class lmshistory {
public historyiddesc :string;public historyid :number;public branchid :number;public branchiddesc :string;public branchlocationid :number;public branchlocationiddesc :string;public leadid :number;public leadiddesc :string;public opportunityid :number;public opportunityiddesc :string;public callid :number;public calliddesc :string;public productid :number;public productiddesc :string;public campaignid :number;public campaigniddesc :string;public leadby :number;public leadbydesc :string;public currentowner :string;public leadresponse :string;public leadresponsedesc :string;public nextcalldate :Date;public nextaction :string;public nextactiondesc :string;public actiondatetime :Date;public previousremarks :string;public leadscore :number;public leadsource :string;public leadsourcedesc :string;public leadstage :string;public leadstagedesc :string;public criticality :string;public criticalitydesc :string;public expectedvalue :string;public attachment :string;public customfield :string;public status :string;
constructor() {}
}
export interface IlmshistoryResponse {
total: number;
results: lmshistory[];
}

