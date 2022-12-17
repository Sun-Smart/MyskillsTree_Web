export class ltytransactiondetail {
public transactiondetailiddesc :string;public transactiondetailid :number;public transactionid :number;public productid :number;public productiddesc :string;public quantity :number;public sku :string;public categoryid :number;public categoryiddesc :string;public grossvalue :number;public promotionid :number;public promotioniddesc :string;public status :string;
constructor() {}
}
export interface IltytransactiondetailResponse {
total: number;
results: ltytransactiondetail[];
}

