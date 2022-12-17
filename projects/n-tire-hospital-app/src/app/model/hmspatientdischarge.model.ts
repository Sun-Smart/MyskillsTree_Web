export class hmspatientdischarge {
    public dischargeid: number; public patientid: number; public dischargedate: Date; public dischargetime: string; public admitteddate: Date; public staydays: number; public doctorid: number; public doctoriddesc: string; public finaldiagnosis: string; public patientcondition: string; public hospitalcourse: string; public notes: string; public admissiondetails: string; public treatment: string; public labnotes: string; public instructions: string; public issuetoaddress: string; public followup: number; public followupunit: string; public followupunitdesc: string; public followupstartdate: Date; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmspatientdischargeResponse {
    total: number;
    results: hmspatientdischarge[];
}

