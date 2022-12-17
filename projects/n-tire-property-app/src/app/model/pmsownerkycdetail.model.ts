export class pmsownerkycdetail {
public kyciddesc :string;public kycid :number;public ownerid :number;public owneriddesc :string;public kyctype :string;public kyctypedesc :string;public kycreference :string;public issuedate :Date;public expirydate :Date;public attachment :string;public status :string;
constructor() {}
}
export interface IpmsownerkycdetailResponse {
total: number;
results: pmsownerkycdetail[];
}

