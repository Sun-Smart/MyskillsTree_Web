export class hrmsrecruitmentagency {
public raiddesc :string;public raid :number;public agencycode :string;public agencyname :string;public contactperson :string;public mobile :string;public email :string;public officephone :string;public address1 :string;public address2 :string;public countryid :number;public countryiddesc :string;public stateid :number;public stateiddesc :string;public cityid :number;public cityiddesc :string;public pincode :string;public creditdays :number;public paymentpercent :number;public paymentamount :number;public freereplacementdays :number;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsrecruitmentagencyResponse {
total: number;
results: hrmsrecruitmentagency[];
}

