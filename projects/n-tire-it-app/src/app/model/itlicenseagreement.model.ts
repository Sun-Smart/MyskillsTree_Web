export class itlicenseagreement {
public licenseagreementiddesc :string;public licenseagreementid :number;public manufacturer :string;public activefrom :Date;public agreementnumber :string;public expirydate :Date;public authorizationnumber :string;public softwareid :number;public supplier :number;public description :string;public terms :string;public ponumber :string;public invoicenumber :string;public poname :string;public invoicedate :Date;public purchasedate :Date;public totalcost :number;public purchasedescription :string;public notify :string;public alarm :string;public status :string;public DeleteditlicenseIDs :string;
constructor() {}
}
export interface IitlicenseagreementResponse {
total: number;
results: itlicenseagreement[];
}

