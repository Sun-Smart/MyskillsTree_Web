export class ltystore {
public storeiddesc :string;public storeid :number;public name :string;public description :string;public identifier :string;public address :string;public contactperson :string;public phone :string;public email :string;public currency :string;public currencydesc :string;public totaltransactionvalue :number;public totaltransactioncount :number;public merchantid :number;public status :string;
constructor() {}
}
export interface IltystoreResponse {
total: number;
results: ltystore[];
}

