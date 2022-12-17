export class hrmsemployeemovementregister {
public movementiddesc :string;public movementid :number;public referenceno :string;public movementdate :Date;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public intime :string;public outtime :string;public movementcategory :string;public movementcategorydesc :string;public reason :string;public status :string;
constructor() {}
}
export interface IhrmsemployeemovementregisterResponse {
total: number;
results: hrmsemployeemovementregister[];
}

