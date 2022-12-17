export class umsquestion {
    public topicid: number; public questionid: number; public categoryid: number; public categoryiddesc: string; public question: string; public questiontype: string; public questiontypedesc: string; public answertype: string; public answertypedesc: string; public correctanswer: string; public status: string; public DeletedumsanswerIDs: string;
    constructor() { }
}
export interface IumsquestionResponse {
    total: number;
    results: umsquestion[];
}

