export class erpphysicalinventorymaster {
public branchid :number;public branchiddesc :string;public piiddesc :string;public piid :number;public pireference :string;public pidate :Date;public method :string;public executedby :string;public locationid :number;public status :string;public DeletederpphysicalinventorydetailIDs :string;
constructor() {}
}
export interface IerpphysicalinventorymasterResponse {
total: number;
results: erpphysicalinventorymaster[];
}

