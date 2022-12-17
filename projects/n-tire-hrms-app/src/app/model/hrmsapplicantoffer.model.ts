export class hrmsapplicantoffer {
public offeriddesc :string;public offerid :number;public mprid :number;public mpriddesc :string;public interviewid :number;public interviewiddesc :string;public offerdate :Date;public joiningdate :Date;public referenceno :string;public applicantid :number;public applicantiddesc :string;public applicantcode :string;public applicantname :string;public title :string;public department :number;public departmentdesc :string;public location :number;public salarytype :string;public basic :number;public allowances :number;public grosssalary :number;public deductions :number;public taxallowed :boolean;public tax :number;public netsalary :number;public notes :string;public remarks :string;public approvaldate :Date;public offersentdate :Date;public acknowledged :boolean;public acknowledgedate :Date;public joineddate :Date;public offerstatus :string;public status :string;public employeeid :number;public employeeiddesc :string;
constructor() {}
}
export interface IhrmsapplicantofferResponse {
total: number;
results: hrmsapplicantoffer[];
}

