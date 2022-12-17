export class umscourse {
    public courseid: number; public code: string; public coursename: string; public description: string; public language: string; public languagedesc: string; public imageurl: string; public totalhours: number; public totalfee: number; public generatecertificate: boolean; public mailcertificate: boolean; public customfield: string; public attachment: string; public status: string; public DeletedumscoursesemesterIDs: string; public DeletedumssemestertopicIDs: string;
    constructor() { }
}
export interface IumscourseResponse {
    total: number;
    results: umscourse[];
}

