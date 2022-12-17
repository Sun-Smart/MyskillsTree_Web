export class erpfabankaccount {
public bankaccountiddesc :string;public bankaccountid :number;public accountid :number;public accountiddesc :string;public ifsccode :string;public accountnumber :string;public accountname :string;public isdefaultaccount :boolean;public accounttype :number;public accountsubtype :number;public accountgroup :string;public accountnotes :string;public swiftcode :string;public bankaccountno :string;public branchdetails :string;public address1 :string;public address2 :string;public countryid :number;public countryiddesc :string;public stateid :number;public stateiddesc :string;public cityid :number;public cityiddesc :string;public pincode :string;public contactperson :string;public designation :string;public mobile :string;public email :string;public status :string;
constructor() {}
}
export interface IerpfabankaccountResponse {
total: number;
results: erpfabankaccount[];
}

