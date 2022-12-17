export class hrmstrainingfeedbacktrainee {
public traineefeedbackiddesc :string;public traineefeedbackid :number;public trainingid :number;public trainingiddesc :string;public employeeid :number;public trainerid :number;public qmid :number;public answer :string;public rating :number;public status :string;
constructor() {}
}
export interface IhrmstrainingfeedbacktraineeResponse {
total: number;
results: hrmstrainingfeedbacktrainee[];
}

