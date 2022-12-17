export class pmemployeekpi {
    public kpidetailid: number; public employeekpiid: number; public departmentid: number; public departmentiddesc: string; public designationid: string; public designationiddesc: string; public employeeid: number; public employeeiddesc: string; public kpiid: number; public kpiiddesc: string; public weight: number; public reviewquestions: string; public remarks: string; public status: string;
    constructor() { }
}
export interface IpmemployeekpiResponse {
    total: number;
    results: pmemployeekpi[];
}

