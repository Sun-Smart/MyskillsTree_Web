export class hmsdoctor {
    public doctorid: number; public doctorname: string; public imageurl: string; public oncall: boolean; public designation: number; public designationdesc: string; public specialization: number; public specializationdesc: string; public contactno: string; public contactnoh: string; public email: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmsdoctorResponse {
    total: number;
    results: hmsdoctor[];
}

