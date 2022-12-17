export class hrmsemployeemedicalassessment {
public branchid :number;public branchiddesc :string;public consultationiddesc :string;public consultationid :number;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public designationid :number;public designationiddesc :string;public referenceno :string;public consultationdate :Date;public consultationtype :string;public consultationtypedesc :string;public resulttype :string;public resulttypedesc :string;public details :string;public workrestrictions :string;public notes :string;public nextassessmentdate :Date;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeemedicalassessmentResponse {
total: number;
results: hrmsemployeemedicalassessment[];
}

