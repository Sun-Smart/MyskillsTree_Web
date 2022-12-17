export class umsclassschedule {
    public scheduleid: number; public courseid: number; public courseiddesc: string; public semesterid: number; public semesteriddesc: string; public topicid: number; public topiciddesc: string; public sectionid: number; public sectioniddesc: string; public startdate: Date; public starttime: string; public enddate: Date; public endtime: string; public instructorid: number; public instructoriddesc: string; public alternateinstructorid: number; public alternateinstructoriddesc: string; public roomid: number; public roomiddesc: string; public customfield: string; public attachment: string; public status: string; public DeletedumsattendanceIDs: string;
    constructor() { }
}
export interface IumsclassscheduleResponse {
    total: number;
    results: umsclassschedule[];
}

