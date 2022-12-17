export class erpsalesincentive {
public incentiveiddesc :string;public incentiveid :number;public invoiceid :number;public userid :number;public contributionrate :number;public rate :number;public amount :number;public status :string;
constructor() {}
}
export interface IerpsalesincentiveResponse {
total: number;
results: erpsalesincentive[];
}

