export class lmscampaigntask {
public productid :number;public productiddesc :string;public campaignid :number;public campaigniddesc :string;public campaigncode :string;public campaigntype :string;public campaigntypedesc :string;public targettype :string;public targettypedesc :string;public taskiddesc :string;public taskid :number;public subject :string;public description :string;public advantages :string;public disadvantages :string;public assignto :string;public assigneddate :Date;public targetdate :Date;public priority :string;public prioritydesc :string;public dailytarget :number;public actualachieved :number;public estimatedcost :number;public actualcost :number;public successpercentage :number;public performancestatus :string;public performancestatusdesc :string;public customfield :string;public attachment :string;public status :string;public DeletedlmscampaigntaskresponseIDs :string;
constructor() {}
}
export interface IlmscampaigntaskResponse {
total: number;
results: lmscampaigntask[];
}

