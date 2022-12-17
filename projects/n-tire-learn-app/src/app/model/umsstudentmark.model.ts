export class umsstudentmark {
    public markid: number; public studentid: number; public studentiddesc: string; public courseid: number; public semesterid: number; public examid: number; public examiddesc: string; public mark: number; public result: string; public resultdesc: string; public recheck: boolean; public status: string;
    constructor() { }
}
export interface IumsstudentmarkResponse {
    total: number;
    results: umsstudentmark[];
}

