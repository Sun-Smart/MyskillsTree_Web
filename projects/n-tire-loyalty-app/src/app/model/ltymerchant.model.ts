export class ltymerchant {
public merchantiddesc :string;public merchantid :number;public establishmentname :string;public businesscategory :string;public businesscategorydesc :string;public segment :string;public segmentdesc :string;public legalname :string;public incorporationdate :Date;public pannumber :string;public website :string;public contactperson :string;public businessaddress :string;public registeredaddress :string;public phone :string;public secondaryphone :string;public email :string;public ownershiptype :string;public ownershiptypedesc :string;public directors :string;public idproof :string;public turnover :number;public bankaccount :string;public bankname :string;public city :string;public branch :string;public employees :number;public vendors :number;public officespace :string;public funding :number;public futureinvestments :number;public venturecapitalistfunding :number;public shareprice :number;public userid :number;public useriddesc :string;public status :string;public DeletedltymerchantproductIDs :string;public DeletedltystoreIDs :string;
constructor() {}
}
export interface IltymerchantResponse {
total: number;
results: ltymerchant[];
}

