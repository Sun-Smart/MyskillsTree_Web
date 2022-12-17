export class mstapplicantlanguagedetail {
    public applicantid: number; public applicantiddesc: string; public languageiddesc: string; public languageid: number; public language: string; public languagedesc: string; public readproficiency: number; public writeproficiency: number; public speakproficiency: number; public overallrating: number; public remarks: string; public attachment: string; public status: string;
    constructor() { }
}
export interface ImstapplicantlanguagedetailResponse {
    total: number;
    results: mstapplicantlanguagedetail[];
}

