export class erpqcmaster {
public branchid :number;public grnid :number;public grniddesc :string;public grnnumber :number;public qciddesc :string;public qcid :number;public qcref :string;public qcdate :Date;public status :string;public DeletederpqcdetailIDs :string;
constructor() {}
}
export interface IerpqcmasterResponse {
total: number;
results: erpqcmaster[];
}

