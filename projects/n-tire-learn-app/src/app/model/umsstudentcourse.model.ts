export class umsstudentcourse {
    public studentcourseid: number; public studentid: number; public courseid: number; public courseiddesc: string; public currenttopicid: number; public currenttopiciddesc: string; public progress: number; public completed: boolean; public status: string;
    constructor() { }
}
export interface IumsstudentcourseResponse {
    total: number;
    results: umsstudentcourse[];
}

