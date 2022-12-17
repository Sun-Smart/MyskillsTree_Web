export class mstapplicantsocialmediadetail {
    public applicantid: number; public applicantiddesc: string; public socialrefiddesc: string; public socialrefid: number; public socialmedianame: number; public socialmedianamedesc: string; public handlename: string; public url: string; public remarks: string; public attachment: string; public status: string;
    constructor() { }
}
export interface ImstapplicantsocialmediadetailResponse {
    total: number;
    results: mstapplicantsocialmediadetail[];
}

