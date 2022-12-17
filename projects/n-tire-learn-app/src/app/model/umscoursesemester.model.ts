export class umscoursesemester {
    public semesterid: number; public courseid: number; public description: string; public imageurl: string; public semesterorder: number; public responsiblepersonid: number; public responsiblepersoniddesc: string; public maxstrength: number; public totalhours: number; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IumscoursesemesterResponse {
    total: number;
    results: umscoursesemester[];
}

