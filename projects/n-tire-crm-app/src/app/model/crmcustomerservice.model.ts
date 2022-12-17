export class crmcustomerservice {
public serviceiddesc :string;public serviceid :number;public currentdate :Date;public currenttime :string;public customerid :number;public customeriddesc :string;public servicetype :string;public servicetypedesc :string;public userid :number;public useriddesc :string;public notes :string;public status :string;public DeletedcrmcustomerservicedetailIDs :string;
constructor() {}
}
export interface IcrmcustomerserviceResponse {
total: number;
results: crmcustomerservice[];
}

