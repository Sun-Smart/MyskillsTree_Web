export class erpcontractorderclause {
public contractid :number;public contractiddesc :string;public supplierid :number;public supplieriddesc :string;public contractclauseiddesc :string;public contractclauseid :number;public clauseid :number;public status :string;
constructor() {}
}
export interface IerpcontractorderclauseResponse {
total: number;
results: erpcontractorderclause[];
}

