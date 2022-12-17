export class pmspropertyinsurance {
public insuranceiddesc :string;public insuranceid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public tenantid :number;public tenantiddesc :string;public insurancecompany :string;public policyid :string;public referenceno :string;public startdate :Date;public expireddate :Date;public coverageamount :number;public remarks :string;public paymentreference :string;public attachment :string;public status :string;
constructor() {}
}
export interface IpmspropertyinsuranceResponse {
total: number;
results: pmspropertyinsurance[];
}

