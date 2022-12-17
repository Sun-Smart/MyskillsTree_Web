export class ltyredeem {
public redeemiddesc :string;public redeemid :number;public redeemdate :Date;public customerid :number;public customeriddesc :string;public reference :string;public rewardid :number;public redeemtype :string;public redeemtypedesc :string;public quantity :number;public redeemed :number;public usagedate :Date;public deliverystatus :string;public deliverystatusdesc :string;public usagestatus :string;public usagestatusdesc :string;public sourcefield :string;public sourcereference :number;public status :string;
constructor() {}
}
export interface IltyredeemResponse {
total: number;
results: ltyredeem[];
}

