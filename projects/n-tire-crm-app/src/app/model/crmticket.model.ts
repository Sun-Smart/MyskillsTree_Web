export class crmticket {
    public ticketid: number; public ticketreference: number; public customerid: number; public customeriddesc: string; public accountnumber: number; public tickettype: string; public tickettypedesc: string; public criticality: string; public criticalitydesc: string; public source: string; public sourcedesc: string; public category: string; public subject: string; public ticketdetails: string; public rca: number; public rcadesc: string; public observation: string; public rcacompletedon: Date; public customfield: string; public attachment: string; public status: string; public DeletedcrmticketdetailIDs: string;
    constructor() { }
}
export interface IcrmticketResponse {
    total: number;
    results: crmticket[];
}

