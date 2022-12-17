export class hrmsemployeedependent {
public dependentiddesc :string;public dependentid :number;public employeeid :number;public employeeiddesc :string;public relationship :string;public relationshipdesc :string;public firstname :string;public lastname :string;public fromdate :Date;public todate :Date;public phone :string;public email :string;public details :string;public status :string;
constructor() {}
}
export interface IhrmsemployeedependentResponse {
total: number;
results: hrmsemployeedependent[];
}

