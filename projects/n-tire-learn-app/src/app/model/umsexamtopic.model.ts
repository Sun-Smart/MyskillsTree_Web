export class umsexamtopic {
    public examtopicid: number; public examid: number; public courseid: number; public semesterid: number; public topicid: number; public status: string;
    constructor() { }
}
export interface IumsexamtopicResponse {
    total: number;
    results: umsexamtopic[];
}

