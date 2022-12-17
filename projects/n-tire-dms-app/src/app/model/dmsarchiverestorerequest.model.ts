export class dmsarchiverestorerequest {
public requestiddesc :string;public requestid :number;public requesteddate :Date;public requestuserid :number;public adminuserid :number;public adminuseriddesc :string;public documentid :number;public documentiddesc :string;public comments :string;public status :string;
constructor() {}
}
export interface IdmsarchiverestorerequestResponse {
total: number;
results: dmsarchiverestorerequest[];
}

