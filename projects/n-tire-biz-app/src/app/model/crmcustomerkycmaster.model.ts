export class crmcustomerkycmaster {
    public kyciddesc: string; public kycid: number; public customerid: number; public customeriddesc: string; public identityname: number; public identitynamedesc: string; public identitynumber: string; public issuedate: Date; public expirydate: Date; public renewalrequired: boolean; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IcrmcustomerkycmasterResponse {
    total: number;
    results: crmcustomerkycmaster[];
}

