export class camspmsuppliertask {
public pmsupplieriddesc :string;public pmsupplierid :number;public pmid :number;public pmiddesc :string;public supplierid :number;public supplieriddesc :string;public taskdescription :string;public tasktype :string;public tasktypedesc :string;public notes :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspmsuppliertaskResponse {
total: number;
results: camspmsuppliertask[];
}

