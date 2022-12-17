export class hrmsinterviewscoring {
public interviewid :number;public interviewiddesc :string;public scoringiddesc :string;public scoringid :number;public interviewround :string;public interviewrounddesc :string;public criteria :number;public criteriadesc :string;public rating :number;public weightage :number;public score :number;public notes :string;public status :string;
constructor() {}
}
export interface IhrmsinterviewscoringResponse {
total: number;
results: hrmsinterviewscoring[];
}

