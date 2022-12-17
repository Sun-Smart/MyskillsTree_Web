export class mstapplicantworkreference {
    public applicantid: number; public applicantiddesc: string; public workreferenceiddesc: string; public workreferenceid: number; public worktopic: string; public workdescription: string; public referenceurl: string; public remarks: string; public attachment: string; public status: string;
    constructor() { }
}
export interface ImstapplicantworkreferenceResponse {
    total: number;
    results: mstapplicantworkreference[];
}

