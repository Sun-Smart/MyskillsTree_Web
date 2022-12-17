export class erpmaterialissuing {
public branchid :number;public issuetype :string;public referenceid :number;public miiddesc :string;public miid :number;public purchaserequisitionid :number;public storeuserid :number;public storeuseriddesc :string;public issuedto :number;public issuedtodesc :string;public projectid :number;public projectiddesc :string;public itemid :number;public uom :number;public locationid :number;public locationiddesc :string;public binlocationid :number;public requestedqty :string;public issueqty :string;public serialbatch :string;public status :string;
constructor() {}
}
export interface IerpmaterialissuingResponse {
total: number;
results: erpmaterialissuing[];
}

