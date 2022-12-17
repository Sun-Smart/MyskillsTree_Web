export class hmstreatment {
    public treatmentid: number; public treatmentname: string; public visittype: number; public visittypedesc: string; public wardroundid: number; public wardroundiddesc: string; public visitid: number; public patientid: number; public treatmentcategory: string; public treatmentcategorydesc: string; public treatmenttype: string; public treatmenttypedesc: string; public medicine: string; public externalmedicine: boolean; public dosage: string; public numberofdays: number; public morning: boolean; public afternoon: boolean; public night: boolean; public status: string;
    constructor() { }
}
export interface IhmstreatmentResponse {
    total: number;
    results: hmstreatment[];
}

