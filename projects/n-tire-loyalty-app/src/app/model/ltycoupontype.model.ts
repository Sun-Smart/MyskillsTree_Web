export class ltycoupontype {
public coupontypeiddesc :string;public coupontypeid :number;public name :string;public allowedonlyonce :boolean;public numlength :number;public pattern :string;public prefix :string;public suffix :string;public limitpercustomer :number;public design :string;public redeeminstructions :string;public status :string;
constructor() {}
}
export interface IltycoupontypeResponse {
total: number;
results: ltycoupontype[];
}

