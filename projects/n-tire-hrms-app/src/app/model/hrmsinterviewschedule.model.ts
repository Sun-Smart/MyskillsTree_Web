export class hrmsinterviewschedule {
public interviewreference :string;public interviewiddesc :string;public interviewid :number;public mprid :number;public mpriddesc :string;public jobrole :number;public jobroledesc :string;public applicantid :number;public applicantiddesc :string;public interviewround :string;public interviewrounddesc :string;public interviewdate :Date;public interviewtime :string;public venue :string;public venuedesc :string;public interviewer :number;public interviewerdesc :string;public contactperson :number;public contactpersondesc :string;public rating :number;public totalscore :number;public interviewremarks :string;public interviewstatus :string;public interviewstatusdesc :string;public status :string;public DeletedhrmsinterviewscoringIDs :string;
constructor() {}
}
export interface IhrmsinterviewscheduleResponse {
total: number;
results: hrmsinterviewschedule[];
}

