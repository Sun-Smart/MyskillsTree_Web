export class hmspatientvaccination {
    public patientvaccinationid: number; public patientid: number; public doctorid: number; public vaccinationid: number; public vaccinationiddesc: string; public startdate: Date; public vaccinated: boolean; public vaccinateddate: Date; public status: string;
    constructor() { }
}
export interface IhmspatientvaccinationResponse {
    total: number;
    results: hmspatientvaccination[];
}

