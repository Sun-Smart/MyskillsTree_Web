export class crmticketdetail {
    public ticketdetailid: number; public ticketid: number; public orderno: number; public assignedtype: string; public assignedtypedesc: string; public assigneduser: number; public assigneduserdesc: string; public assignedrole: number; public assignedroledesc: string; public actionuser: number; public actionuserdesc: string; public assigneddate: Date; public actiondate: Date; public tatends: Date; public actionremarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IcrmticketdetailResponse {
    total: number;
    results: crmticketdetail[];
}

