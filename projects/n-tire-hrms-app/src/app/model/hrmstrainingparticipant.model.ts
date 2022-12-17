export class hrmstrainingparticipant {
public participantiddesc :string;public participantid :number;public trainingid :number;public trainingiddesc :string;public feedbackabouttrainer :string;public feedbackbytrainer :string;public employeeid :number;public status :string;
constructor() {}
}
export interface IhrmstrainingparticipantResponse {
total: number;
results: hrmstrainingparticipant[];
}

