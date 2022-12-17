export class hmsadmission {
    public admissionid: number; public patientid: number; public code: string; public admissiondate: Date; public admissiontime: string; public doctorid: number; public doctoriddesc: string; public category: number; public categorydesc: string; public subcategory: number; public subcategorydesc: string; public ward: number; public warddesc: string; public bed: number; public beddesc: string; public diagnosis: string; public admissiondetails: string; public treatment: string; public responsibilityid: number; public responsibilityiddesc: string; public status: string; public notes: string;
    constructor() { }
}
export interface IhmsadmissionResponse {
    total: number;
    results: hmsadmission[];
}

