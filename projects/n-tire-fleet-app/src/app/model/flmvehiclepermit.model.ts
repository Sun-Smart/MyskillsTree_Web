export class flmvehiclepermit {
    public permitid: number; public vehicleid: number; public validenddate: Date; public issuingauthority: string; public fitnesscertificateenddate: Date; public status: string;
    constructor() { }
}
export interface IflmvehiclepermitResponse {
    total: number;
    results: flmvehiclepermit[];
}

