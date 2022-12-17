export class ltytransactionsegment {
public segmentiddesc :string;public segmentid :number;public name :string;public description :string;public type :string;public typedesc :string;public rank :number;public excludeddeliverycosts :number;public multiplier :number;public validity :string;public validitydesc :string;public condition :string;public totalcustomers :number;public avgtransactionamount :number;public avgtransactions :number;public avgclv :number;public status :string;
constructor() {}
}
export interface IltytransactionsegmentResponse {
total: number;
results: ltytransactionsegment[];
}

