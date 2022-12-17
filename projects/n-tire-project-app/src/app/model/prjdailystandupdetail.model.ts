export class prjdailystandupdetail {
    public standupdetailiddesc: string; public standupdetailid: number; public standupid: number; public projectid: number; public currentdate: Date; public userid: number; public question: string; public questiondesc: string; public answer: string; public rating: string; public ratingdesc: string; public notes: string; public status: string;
    constructor() { }
}
export interface IprjdailystandupdetailResponse {
    total: number;
    results: prjdailystandupdetail[];
}

