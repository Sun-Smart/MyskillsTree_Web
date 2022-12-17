export class hmspatientvisit {
    public visitid: number; public patientid: number; public referredbydoctor: string; public lastvisited: Date; public previousdoctorid: number; public previousdoctoriddesc: string; public lastvisitcomplaint: string; public complaint: string; public symptoms: string; public examinationnotes: string; public medicalhistory: string; public treatmentadvised: string; public testadvised: string; public testresult: string; public diagnosis: string; public pressure: number; public pressureremarks: string; public pulse: number; public pulseremarks: string; public temperature: number; public temperatureremarks: string; public weight: number; public height: number; public doctorid: number; public complaintcause: string; public treatment: string; public instructions: string; public followupdays: number; public followupunit: string; public followupunitdesc: string; public remarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmspatientvisitResponse {
    total: number;
    results: hmspatientvisit[];
}

