export class mstapplicantachievementdetail {
    public applicantid: number; public applicantiddesc: string; public achievementiddesc: string; public achievementid: number; public masterdataid: number; public masterdataiddesc: string; public achievementdetails: string; public selfrating: number; public remarks: string; public requestid: number; public referenceacceptance: string; public referenceacceptancedesc: string; public attachment: string; public status: string;
  fromdate: Date;
  todate: any;
  skills: any;
    constructor() { }
}
export interface ImstapplicantachievementdetailResponse {
    total: number;
    results: mstapplicantachievementdetail[];
}

