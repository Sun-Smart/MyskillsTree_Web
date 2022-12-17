export class hrmstrainingmaster {
public trainingmasteriddesc :string;public trainingmasterid :number;public topic :string;public trainingmode :string;public trainingmodedesc :string;public copyfrom :string;public category :number;public categorydesc :string;public startdate :Date;public status :string;public DeletedhrmstrainingattendanceIDs :string;public DeletedhrmstrainingfeedbacktraineeIDs :string;public DeletedhrmstrainingfeedbacktrainerIDs :string;public DeletedhrmstrainingparticipantIDs :string;public DeletedhrmstrainingscheduleIDs :string;
constructor() {}
}
export interface IhrmstrainingmasterResponse {
total: number;
results: hrmstrainingmaster[];
}

