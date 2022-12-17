export class umsanswer {
    public answerid: number; public questionid: number; public answer: string; public sequence: number; public status: string;
    constructor() { }
}
export interface IumsanswerResponse {
    total: number;
    results: umsanswer[];
}

