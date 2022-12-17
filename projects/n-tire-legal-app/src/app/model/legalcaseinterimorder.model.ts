export class legalcaseinterimorder {
public caseid :number;public interimorderiddesc :string;public interimorderid :number;public interimdate :Date;public ordernumber :string;public description :string;public notes :string;public attachment :string;public status :string;
constructor() {}
}
export interface IlegalcaseinterimorderResponse {
total: number;
results: legalcaseinterimorder[];
}

