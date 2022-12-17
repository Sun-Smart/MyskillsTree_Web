export class ltyrewardsegment {
public segmentiddesc :string;public segmentid :number;public name :string;public description :string;public type :string;public typedesc :string;public rank :number;public rewardmethod :string;public rewardmethoddesc :string;public rewardvalue :number;public coupontypeid :number;public coupontypeiddesc :string;public productid :number;public productiddesc :string;public rewardunit :string;public rewardunitdesc :string;public rewardprefix :string;public rewardprefixdesc :string;public rewardmultiplier :number;public condition :string;public claimbuttonlabel :string;public redeeminstructions :string;public totalcustomers :number;public avgtransactionamount :number;public avgtransactions :number;public avgclv :number;public status :string;
constructor() {}
}
export interface IltyrewardsegmentResponse {
total: number;
results: ltyrewardsegment[];
}

