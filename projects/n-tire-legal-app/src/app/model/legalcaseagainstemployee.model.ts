export class legalcaseagainstemployee {
public caseagainstiddesc :string;public caseagainstid :number;public caseid :number;public caseiddesc :string;public departmentid :number;public departmentiddesc :string;public employeeid :number;public employeeiddesc :string;public issuecategory :string;public issuecategorydesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IlegalcaseagainstemployeeResponse {
total: number;
results: legalcaseagainstemployee[];
}

