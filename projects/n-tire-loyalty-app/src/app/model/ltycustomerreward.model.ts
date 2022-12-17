export class ltycustomerreward {
public customerrewardiddesc :string;public customerrewardid :number;public rewardid :number;public rewarddate :Date;public customerid :number;public customeriddesc :string;public rewardtype :number;public rewardsubtype :number;public transactionnumber :string;public quantity :number;public redeemed :number;public sourcefield :string;public sourcereference :number;public status :string;
constructor() {}
}
export interface IltycustomerrewardResponse {
total: number;
results: ltycustomerreward[];
}

