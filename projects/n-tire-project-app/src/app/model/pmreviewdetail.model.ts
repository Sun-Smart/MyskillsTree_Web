export class pmreviewdetail {
    public reviewdetailid: number; public reviewid: number; public departmentid: number; public departmentiddesc: string; public designationid: string; public designationiddesc: string; public employeeid: number; public employeeiddesc: string; public kpiid: number; public kpiiddesc: string; public name: string; public target: string; public actual: string; public format: string; public formatdesc: string; public employeescore: number; public reviewerscore: number; public reviewquestions: string; public reviewanswers: string; public recommendations: string; public status: string;
    constructor() { }
}
export interface IpmreviewdetailResponse {
    total: number;
    results: pmreviewdetail[];
}

