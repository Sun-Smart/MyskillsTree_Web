export class pmskycdetail {
public kyciddesc :string;public kycid :number;public tenantid :number;public tenantiddesc :string;public kyctype :string;public kyctypedesc :string;public kycreference :string;public issuedate :Date;public expirydate :Date;public attachment :string;public status :string;
constructor() {}
}
export interface IpmskycdetailResponse {
total: number;
results: pmskycdetail[];
}

