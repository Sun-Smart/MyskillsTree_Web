export class ltyrewardcampaign {
    public rewardcampaignid: number; public name: string; public campaigntype: string; public campaigntypedesc: string; public costinpoints: number; public totallimit: number; public limitpercustomer: number; public usedbycustomers: number; public couponscount: number; public startdate: Date; public enddate: Date; public fulfillmenttracking: boolean; public status: string;
    constructor() { }
}
export interface IltyrewardcampaignResponse {
    total: number;
    results: ltyrewardcampaign[];
}

