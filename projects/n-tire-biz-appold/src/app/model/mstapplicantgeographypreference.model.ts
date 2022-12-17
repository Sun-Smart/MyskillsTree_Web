export class mstapplicantgeographypreference {
    public applicantid: number; public applicantiddesc: string; public geographypreferenceiddesc: string; public geographypreferenceid: number; public country: number; public countrydesc: string; public city: number; public citydesc: string; public remarks: string; public status: string; public attachment: string;
    constructor() { }
}
export interface ImstapplicantgeographypreferenceResponse {
    total: number;
    results: mstapplicantgeographypreference[];
}

