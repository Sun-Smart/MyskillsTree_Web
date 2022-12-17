export class hrmsinterviewrolescoring {
public userroleid :number;public userroleiddesc :string;public userrolescoringiddesc :string;public userrolescoringid :number;public interviewround :string;public interviewrounddesc :string;public criteria :number;public criteriadesc :string;public weightage :number;public status :string;
constructor() {}
}
export interface IhrmsinterviewrolescoringResponse {
total: number;
results: hrmsinterviewrolescoring[];
}

