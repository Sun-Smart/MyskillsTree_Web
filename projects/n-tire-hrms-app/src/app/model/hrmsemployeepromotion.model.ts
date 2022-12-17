export class hrmsemployeepromotion {
public promotioniddesc :string;public promotionid :number;public referenceno :string;public referencedate :Date;public employeeid :number;public employeeiddesc :string;public promotiontype :string;public promotiontypedesc :string;public effectivedate :Date;public currentrole :number;public currentroledesc :string;public newrole :number;public newroledesc :string;public reportingto :number;public reportingtodesc :string;public payscale :number;public basicsalary :number;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeepromotionResponse {
total: number;
results: hrmsemployeepromotion[];
}

