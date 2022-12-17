export class hlpticketdetail {
    public ticketdetailiddesc: string; public ticketdetailid: number; public ticketid: number; public ticketiddesc: string; public sourcefield: string; public sourcereference: number; public assignedto: string; public actionuser: number; public actionuserdesc: string; public assigneddate: Date; public actiondate: Date; public tatends: Date; public actionremarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhlpticketdetailResponse {
    total: number;
    results: hlpticketdetail[];
}

