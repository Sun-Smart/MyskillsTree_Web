export class legalcourtmaster {
public courtiddesc :string;public courtid :number;public courtcategory :number;public courtcategorydesc :string;public courtname :string;public lawyers :number;public benches :number;public address1 :string;public address2 :string;public district :string;public districtdesc :string;public countryid :number;public countryiddesc :string;public stateid :number;public stateiddesc :string;public cityid :number;public cityiddesc :string;public pin :string;public status :string;public DeletedlegalcourtbranchmasterIDs :string;
constructor() {}
}
export interface IlegalcourtmasterResponse {
total: number;
results: legalcourtmaster[];
}

