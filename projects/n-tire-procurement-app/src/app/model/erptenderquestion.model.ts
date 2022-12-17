export class erptenderquestion {
public tenderid :number;public tenderiddesc :string;public questioniddesc :string;public questionid :number;public question :string;public status :string;
constructor() {}
}
export interface IerptenderquestionResponse {
total: number;
results: erptenderquestion[];
}

