export class umsinstructormaster {
    public instructorid: number; public name: string; public contactno: string; public email: string; public instructortype: string; public instructortypedesc: string; public employeeid: number; public employeeiddesc: string; public department: number; public departmentdesc: string; public remarks: string; public customfield: string; public attachment: string; public status: string; public DeletedumsinstructorskillIDs: string;
    constructor() { }
}
export interface IumsinstructormasterResponse {
    total: number;
    results: umsinstructormaster[];
}

