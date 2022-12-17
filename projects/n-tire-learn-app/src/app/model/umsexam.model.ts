export class umsexam {
    public examid: number; public courseid: number; public courseiddesc: string; public semesterid: number; public semesteriddesc: string; public examtype: string; public examtypedesc: string; public examtitle: string; public questions: number; public instructions: string; public totalmarks: number; public examdate: Date; public fromtime: string; public totime: string; public sectionid: number; public sectioniddesc: string; public status: string; public DeletedumsstudentmarkIDs: string; public DeletedumsexamtopicIDs: string;
    constructor() { }
}
export interface IumsexamResponse {
    total: number;
    results: umsexam[];
}

