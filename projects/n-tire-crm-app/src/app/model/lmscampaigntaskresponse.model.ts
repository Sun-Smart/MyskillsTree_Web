export class lmscampaigntaskresponse {
public productid :number;public campaignid :number;public campaigncode :string;public campaigntype :string;public campaigntypedesc :string;public taskid :number;public responseiddesc :string;public responseid :number;public responsedetail :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IlmscampaigntaskresponseResponse {
total: number;
results: lmscampaigntaskresponse[];
}

