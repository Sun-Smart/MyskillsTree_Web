export class ltysegment {
public segmentiddesc :string;public segmentid :number;public name :string;public description :string;public type :string;public typedesc :string;public condition :string;public minvalue :number;public maxvalue :number;public totalcustomers :number;public avgtransactionamount :number;public avgtransactions :number;public avgclv :number;public status :string;
constructor() {}
}
export interface IltysegmentResponse {
total: number;
results: ltysegment[];
}

