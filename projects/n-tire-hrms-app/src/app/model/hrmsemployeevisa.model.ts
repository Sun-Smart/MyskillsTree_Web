export class hrmsemployeevisa {
public visaiddesc :string;public visaid :number;public employeeid :number;public employeeiddesc :string;public visatype :string;public visatypedesc :string;public issuedate :Date;public expirydate :Date;public rpnumber :string;public visadesignation :string;public visadesignationdesc :string;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeevisaResponse {
total: number;
results: hrmsemployeevisa[];
}

