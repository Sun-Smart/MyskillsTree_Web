export class ltyproductsegment {
public segmentiddesc :string;public segmentid :number;public name :string;public description :string;public type :string;public typedesc :string;public condition :string;public totalproducts :number;public avgtransactionamount :number;public avgtransactions :number;public avgclv :number;public status :string;
constructor() {}
}
export interface IltyproductsegmentResponse {
total: number;
results: ltyproductsegment[];
}

