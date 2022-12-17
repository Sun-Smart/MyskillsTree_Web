export class erptenderquotationanswer {
public tenderid :number;public quotationid :number;public quotationiddesc :string;public answeriddesc :string;public answerid :number;public questionid :number;public questioniddesc :string;public question :string;public answer :string;public status :string;
constructor() {}
}
export interface IerptenderquotationanswerResponse {
total: number;
results: erptenderquotationanswer[];
}

