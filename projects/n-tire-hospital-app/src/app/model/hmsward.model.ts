export class hmsward {
    public wardid: number; public wardname: string; public responsibilityid: number; public responsibilityiddesc: string; public beds: number; public imageurl: string; public notes: string; public customfield: string; public attachment: string; public status: string; public DeletedhmswardroundIDs: string; public DeletedhmsbedIDs: string; public DeletedhmswardinchargeIDs: string;
    constructor() { }
}
export interface IhmswardResponse {
    total: number;
    results: hmsward[];
}

