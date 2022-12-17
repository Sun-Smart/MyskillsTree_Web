export class hrmsemployeeexitquestion {
public branchid :number;public exitquestioniddesc :string;public exitquestionid :number;public resignationid :number;public employeeid :number;public employeename :string;public departmentid :number;public designationid :number;public reference :string;public referencedate :Date;public status :string;
constructor() {}
}
export interface IhrmsemployeeexitquestionResponse {
total: number;
results: hrmsemployeeexitquestion[];
}

