export class erplocationmaster {
public locationiddesc :string;public locationid :number;public branchid :number;public branchiddesc :string;public locationcode :string;public locationname :string;public locationtype :string;public locationtypedesc :string;public areasqft :number;public contactname :string;public designation :string;public mobile :string;public email :string;public address1 :string;public address2 :string;public countryid :number;public countryiddesc :string;public stateid :number;public stateiddesc :string;public cityid :number;public cityiddesc :string;public pin :string;public latlong :string;public restrictcurrency :string;public restrictamount :string;public status :string;public DeletederpbinlocationmasterIDs :string;
constructor() {}
}
export interface IerplocationmasterResponse {
total: number;
results: erplocationmaster[];
}

