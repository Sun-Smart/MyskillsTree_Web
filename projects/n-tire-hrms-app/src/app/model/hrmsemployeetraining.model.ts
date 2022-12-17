export class hrmsemployeetraining {
public emptrainingiddesc :string;public emptrainingid :number;public employeeid :number;public employeeiddesc :string;public trainingid :number;public trainingiddesc :string;public skill :string;public skilldesc :string;public trainerfeedback :string;public coursefeedback :string;public status :string;
constructor() {}
}
export interface IhrmsemployeetrainingResponse {
total: number;
results: hrmsemployeetraining[];
}

