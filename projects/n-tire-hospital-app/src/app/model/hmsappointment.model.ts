export class hmsappointment {
    public appointmentid: number; public patientid: number; public doctorid: number; public doctoriddesc: string; public appointmentdate: Date; public appointmenttime: string; public appointmenttype: string; public appointmenttypedesc: string; public reason: string; public tokenno: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmsappointmentResponse {
    total: number;
    results: hmsappointment[];
}

