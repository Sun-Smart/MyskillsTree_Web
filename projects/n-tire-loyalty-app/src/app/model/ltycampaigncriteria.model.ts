export class ltycampaigncriteria {
public detailiddesc :string;public detailid :number;public campaignid :number;public campaigniddesc :string;public criteria :string;public sequence :number;public status :string;
constructor() {}
}
export interface IltycampaigncriteriaResponse {
total: number;
results: ltycampaigncriteria[];
}

