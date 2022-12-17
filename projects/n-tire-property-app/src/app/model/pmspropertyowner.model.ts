export class pmspropertyowner {
public owneriddesc :string;public ownerid :number;public firstname :string;public lastname :string;public iscompany :boolean;public companyname :string;public thumbnail :string;public emailid :string;public mobileno :string;public housecontactno :string;public officecontactno :string;public address1 :string;public address2 :string;public countryid :number;public countryiddesc :string;public stateid :number;public stateiddesc :string;public cityid :number;public cityiddesc :string;public bankname :string;public bankaccount :string;public iban :string;public nationalitynumber :string;public status :string;public DeletedpmsleaseIDs :string;public DeletedpmsworkorderIDs :string;public DeletedpmschargeIDs :string;public DeletedpmsdepositIDs :string;public DeletedpmspdcIDs :string;public DeletedpmspropertyopexdetailIDs :string;public DeletedpmsscheduleIDs :string;public DeletedpmstransactionIDs :string;public DeletedpmstransactionscheduleIDs :string;public DeletedpmsownerkycdetailIDs :string;public DeletedpmspropertyunitownerIDs :string;public DeletedpmsunitchargesIDs :string;
constructor() {}
}
export interface IpmspropertyownerResponse {
total: number;
results: pmspropertyowner[];
}

