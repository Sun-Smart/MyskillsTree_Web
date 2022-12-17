export class hrmsemployeemembershipdetail {
public employeeid :number;public membershipiddesc :string;public membershipid :number;public category :string;public institution :string;public reference :string;public fromdate :Date;public expirydate :Date;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeemembershipdetailResponse {
total: number;
results: hrmsemployeemembershipdetail[];
}

