export class ltyloyaltyaudittrail {
public transactioniddesc :string;public transactionid :number;public reference :string;public transactiondate :Date;public transactiontype :string;public transactiontypedesc :string;public customerid :number;public customeriddesc :string;public merchantid :number;public merchantiddesc :string;public storeid :number;public storeiddesc :string;public description :string;public sourcefield :string;public sourcereference :number;public oldlevel :number;public loyaltylevel :number;public pointearned :number;public amountearned :number;public pointtransferred :number;public redeempoint :number;public redeemamount :number;public expiredpoints :number;public lockedpoints :number;public blockedpoints :number;public productid :number;public productiddesc :string;public discountproductid :number;public discountproductiddesc :string;public status :string;
constructor() {}
}
export interface IltyloyaltyaudittrailResponse {
total: number;
results: ltyloyaltyaudittrail[];
}

