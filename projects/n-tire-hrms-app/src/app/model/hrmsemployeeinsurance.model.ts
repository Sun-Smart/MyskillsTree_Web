export class hrmsemployeeinsurance {
public insuranceid :number;public employeeiddesc :string;public employeeid :number;public insuranceno :string;public insurancecompany :string;public insurancedate :Date;public expirydate :Date;public remarks :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeinsuranceResponse {
total: number;
results: hrmsemployeeinsurance[];
}

