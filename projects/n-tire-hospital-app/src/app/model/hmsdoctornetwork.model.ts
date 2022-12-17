export class hmsdoctornetwork {
    public hospitalid: number; public doctorid: number; public doctorname: string; public designation: number; public designationdesc: string; public specialization: number; public specializationdesc: string; public contactno: string; public email: string; public status: string;
    constructor() { }
}
export interface IhmsdoctornetworkResponse {
    total: number;
    results: hmsdoctornetwork[];
}

