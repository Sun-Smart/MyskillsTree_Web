export class ltytransaction {
public transactioniddesc :string;public transactionid :number;public sourcefield :string;public sourcereference :number;public reference :string;public customerid :number;public customeriddesc :string;public customername :string;public categoryid :number;public categoryiddesc :string;public email :string;public phone :string;public address :string;public loyaltycardnumber :string;public purchasedate :Date;public merchantid :number;public merchantiddesc :string;public storeid :number;public storeiddesc :string;public transactiontype :string;public transactiontypedesc :string;public currency :string;public currencydesc :string;public amount :number;public pointsearned :number;public details :string;public metatag :string;public status :string;public DeletedltytransactiondetailIDs :string;
constructor() {}
}
export interface IltytransactionResponse {
total: number;
results: ltytransaction[];
}

