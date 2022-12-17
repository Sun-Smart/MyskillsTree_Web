export class pmreview {
    public reviewid: number; public departmentid: number; public departmentiddesc: string; public designationid: string; public employeeid: number; public employeeiddesc: string; public fromdate: Date; public todate: Date; public reviewdate: Date; public reviewedby: number; public reviewedbydesc: string; public supervisedby: number; public supervisedbydesc: string; public reviewerremarks: string; public employeeremarks: string; public decision: string; public decisiondesc: string; public status: string; public DeletedpmreviewdetailIDs: string;
    constructor() { }
}
export interface IpmreviewResponse {
    total: number;
    results: pmreview[];
}

