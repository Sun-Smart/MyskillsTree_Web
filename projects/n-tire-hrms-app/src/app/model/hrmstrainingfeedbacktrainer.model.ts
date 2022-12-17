export class hrmstrainingfeedbacktrainer {
public trainerfeedbackiddesc :string;public trainerfeedbackid :number;public trainingid :number;public trainingiddesc :string;public employeeid :number;public trainerid :number;public qmid :number;public answer :string;public rating :number;public status :string;
constructor() {}
}
export interface IhrmstrainingfeedbacktrainerResponse {
total: number;
results: hrmstrainingfeedbacktrainer[];
}

