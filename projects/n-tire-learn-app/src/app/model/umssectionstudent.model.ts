export class umssectionstudent {
    public studentsectionid: number; public studentid: number; public sectionid: number; public status: string;
    constructor() { }
}
export interface IumssectionstudentResponse {
    total: number;
    results: umssectionstudent[];
}

