export class hmswardround {
    public wardroundid: number; public wardid: number; public doctorid: number; public doctoriddesc: string; public doctorname: string; public patientid: number; public patientiddesc: string; public bedid: number; public bediddesc: string; public nurseid: number; public nurseiddesc: string; public visitdate: Date; public visittime: string; public postoperationday: number; public symptoms: string; public examinations: string; public instructions: string; public assessment: string; public notes: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmswardroundResponse {
    total: number;
    results: hmswardround[];
}

