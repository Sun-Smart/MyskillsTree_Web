export class bocompanyregistration {
    public registrationiddesc: string; public registrationid: number; public companyname: string; public companytype: string; public companytypedesc: string; public firstname: string; public lastname: string; public designation: number; public designationdesc: string; public emailid: string; public mobilenumber: string; public status: string;
    constructor() { }
}
export interface IbocompanyregistrationResponse {
    total: number;
    results: bocompanyregistration[];
}

