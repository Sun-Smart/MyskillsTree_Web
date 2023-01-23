export class mstapplicantcareerdetail {
    public applicantid: number; public applicantiddesc: string; public careeriddesc: string; public careerid: number; public category: string; public categorydesc: string; public companyname: string; public designation: string; public fromdate: any; public todate: any; public currentlyworking: boolean; public skills: string; public skillsstring: string; public remarks: string; public status: string; public attachment: string;
    constructor() { }
}
export interface ImstapplicantcareerdetailResponse {
    total: number;
    results: mstapplicantcareerdetail[];
}

