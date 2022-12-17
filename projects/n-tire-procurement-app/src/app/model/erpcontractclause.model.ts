export class erpcontractclause {
public clauseiddesc :string;public clauseid :number;public referencenumber :string;public details :string;public parentid :number;public parentiddesc :string;public notes :string;public status :string;
constructor() {}
}
export interface IerpcontractclauseResponse {
total: number;
results: erpcontractclause[];
}

