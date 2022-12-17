export class lmscorporatesecondarycontact {
    public branchid: number; public branchiddesc: string; public leadid: number; public secondarycontactiddesc: string; public secondarycontactid: number; public firstname: string; public lastname: string; public companyname: string; public designation: number; public designationdesc: string; public category: string; public categorydesc: string; public groupname: string; public groupnamedesc: string; public mobile: string; public officephone: string; public extension: string; public residencephone: string; public emailid: string; public status: string;
    constructor() { }
}
export interface IlmscorporatesecondarycontactResponse {
    total: number;
    results: lmscorporatesecondarycontact[];
}

