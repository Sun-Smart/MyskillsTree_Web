export class umsexamschedule {
    public examid: number; public courseid: number; public courseiddesc: string; public semesterid: number; public semesteriddesc: string; public description: string; public examdate: Date; public fromtime: string; public totime: string; public totalmarks: number; public sectionid: number; public sectioniddesc: string; public status: string; public DeletedumsstudentmarkIDs: string;
    constructor() { }
}
export interface IumsexamscheduleResponse {
    total: number;
    results: umsexamschedule[];
}

