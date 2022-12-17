export class bocompanysetting {
    public settingsiddesc: string; public settingsid: number; public adminroleid: number; public adminroleiddesc: string; public purchaseterms: string; public annualdays: number; public leavecarryforward: boolean; public maxleavescarryforward: number; public earnedleave: boolean; public sickdaysallowed: boolean; public sickdays: number; public medicaldays: number; public maternityleaveallowed: boolean; public maternitydays: number; public lop: number; public lopcarryforward: boolean; public lopmaxdayscarryforward: number; public customfield: string; public status: string;
    constructor() { }
}
export interface IbocompanysettingResponse {
    total: number;
    results: bocompanysetting[];
}

