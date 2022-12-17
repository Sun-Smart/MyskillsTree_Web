export class hmsconsent {
    public consentid: number; public patientid: number; public consentname: string; public relation: string; public relationdesc: string; public consentdate: Date; public signature: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmsconsentResponse {
    total: number;
    results: hmsconsent[];
}

