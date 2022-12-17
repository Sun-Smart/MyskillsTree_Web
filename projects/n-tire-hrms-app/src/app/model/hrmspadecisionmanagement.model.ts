export class hrmspadecisionmanagement {
public appraisaldecisioniddesc :string;public appraisaldecisionid :number;public paid :number;public employeeid :number;public appraisaluser :number;public changeinrole :number;public salarychange :number;public effectivedate :Date;public status :string;
constructor() {}
}
export interface IhrmspadecisionmanagementResponse {
total: number;
results: hrmspadecisionmanagement[];
}

