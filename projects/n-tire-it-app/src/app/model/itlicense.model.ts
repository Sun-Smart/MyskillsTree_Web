export class itlicense {
public licenseiddesc :string;public licenseid :number;public licenseagreementid :number;public licensename :string;public description :string;public acquisitiondate :Date;public expirydate :Date;public software :string;public licensetype :string;public licensetypedesc :string;public licenseoption :string;public licenseoptiondesc :string;public installationsallowed :boolean;public supplierid :number;public licensekey :string;public cost :number;public assignto :string;public departmentid :number;public status :string;
constructor() {}
}
export interface IitlicenseResponse {
total: number;
results: itlicense[];
}

