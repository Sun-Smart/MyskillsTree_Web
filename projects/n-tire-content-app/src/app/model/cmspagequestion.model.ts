export class cmspagequestion {
    public questionid: number; public formid: number; public pageid: number; public question: string; public answertype: string; public answertypedesc: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IcmspagequestionResponse {
    total: number;
    results: cmspagequestion[];
}

