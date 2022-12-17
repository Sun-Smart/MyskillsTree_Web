export class umsattendance {
    public attendanceid: number; public scheduleid: number; public courseid: number; public semesterid: number; public topicid: number; public sectionid: number; public studentid: number; public attended: boolean; public status: string;
    constructor() { }
}
export interface IumsattendanceResponse {
    total: number;
    results: umsattendance[];
}

