export class umsstudentmaster {
    public studentid: number; public code: string; public firstname: string; public middlename: string; public lastname: string; public dob: Date; public contactno: string; public email: string; public fathername: string; public mothername: string; public fathercontactno: string; public admissiondate: Date; public validitystartdate: Date; public validityenddate: Date; public sectionid: number; public sectioniddesc: string; public courseid: number; public courseiddesc: string; public currentsemesterid: number; public currentsemesteriddesc: string; public customfield: string; public attachment: string; public status: string; public DeletedumsstudentmarkIDs: string; public DeletedumsstudentfeemasterIDs: string; public DeletedumsstudentcourseIDs: string;
    constructor() { }
}
export interface IumsstudentmasterResponse {
    total: number;
    results: umsstudentmaster[];
}

