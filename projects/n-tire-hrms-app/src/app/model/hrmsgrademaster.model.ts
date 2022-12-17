export class hrmsgrademaster {
public gradeiddesc :string;public gradeid :number;public description :string;public gradeband :string;public gradebanddesc :string;public gradenumber :string;public status :string;
constructor() {}
}
export interface IhrmsgrademasterResponse {
total: number;
results: hrmsgrademaster[];
}

