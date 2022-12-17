export class pmspropertydocument {
public documentiddesc :string;public documentid :number;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public documentname :string;public createdon :Date;public expiry :Date;public renewdate :Date;public attachment :string;public status :string;
constructor() {}
}
export interface IpmspropertydocumentResponse {
total: number;
results: pmspropertydocument[];
}

