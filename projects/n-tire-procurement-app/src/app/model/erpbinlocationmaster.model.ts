export class erpbinlocationmaster {
public locationid :number;public locationiddesc :string;public branchid :number;public biniddesc :string;public binid :number;public bincode :string;public binname :string;public status :string;
constructor() {}
}
export interface IerpbinlocationmasterResponse {
total: number;
results: erpbinlocationmaster[];
}

