export class hmshospitalnetwork {
    public hospitalid: number; public hospitalname: string; public specialization: string; public address1: string; public address2: string; public countryid: number; public countryiddesc: string; public stateid: number; public stateiddesc: string; public cityid: number; public cityiddesc: string; public location: string; public pincode: string; public contactno1: string; public contactno2: string; public email: string; public contactperson: string; public cpmobile: string; public cpemail: string; public status: string; public DeletedhmsdoctornetworkIDs: string;
    constructor() { }
}
export interface IhmshospitalnetworkResponse {
    total: number;
    results: hmshospitalnetwork[];
}

