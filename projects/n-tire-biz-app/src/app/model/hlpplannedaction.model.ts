export class hlpplannedaction {
    public planiddesc: string; public planid: number; public actionid: number; public ticketid: number; public ticketiddesc: string; public plannedaction: string; public assignto: string; public status: string;
    constructor() { }
}
export interface IhlpplannedactionResponse {
    total: number;
    results: hlpplannedaction[];
}

