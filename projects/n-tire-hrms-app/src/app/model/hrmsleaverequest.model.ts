export class hrmsleaverequest {
public branchid :number;public branchiddesc :string;public leaverequestiddesc :string;public leaverequestid :number;public employeeid :number;public employeeiddesc :string;public employeename :string;public departmentid :number;public departmentiddesc :string;public designationid :number;public designationiddesc :string;public reference :string;public requesteddate :Date;public leavetypeid :number;public leavetypeiddesc :string;public leaveperiod :string;public leaveperioddesc :string;public plannedfromdate :Date;public frommode :string;public frommodedesc :string;public plannedtodate :Date;public tomode :string;public tomodedesc :string;public actualfromdate :Date;public actualtodate :Date;public reason :string;public leavedays :number;public availedleave :number;public availableleave :number;public currentleave :number;public balance :number;public status :string;
constructor() {}
}
export interface IhrmsleaverequestResponse {
total: number;
results: hrmsleaverequest[];
}

