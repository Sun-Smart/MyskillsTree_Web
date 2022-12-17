export class legalopponentmaster {
public opponentiddesc :string;public opponentid :number;public customerid :number;public opponentname :string;public mobilenumber :string;public emailid :string;public address1 :string;public address2 :string;public countryid :number;public countryiddesc :string;public stateid :number;public stateiddesc :string;public cityid :number;public cityiddesc :string;public pin :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IlegalopponentmasterResponse {
total: number;
results: legalopponentmaster[];
}

