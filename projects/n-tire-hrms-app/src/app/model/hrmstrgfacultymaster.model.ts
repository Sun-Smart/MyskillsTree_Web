export class hrmstrgfacultymaster {
public facultyiddesc :string;public facultyid :number;public name :string;public contactno :string;public email :string;public facultytype :string;public facultytypedesc :string;public employeeid :number;public employeeiddesc :string;public faculty :string;public department :number;public departmentdesc :string;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmstrgfacultymasterResponse {
total: number;
results: hrmstrgfacultymaster[];
}

