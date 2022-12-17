export class hrmsemployeetaxdeclaration {
public declarationiddesc :string;public declarationid :number;public employeeid :number;public employeeiddesc :string;public financialyear :number;public financialyeardesc :string;public documentamount :number;public taxeligibleamount :number;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeetaxdeclarationResponse {
total: number;
results: hrmsemployeetaxdeclaration[];
}

