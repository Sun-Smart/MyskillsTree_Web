export class bostate {
    public stateiddesc: string; public stateid: number; public code: string; public name: string; public countryid: number; public status: string; public Deleted_bocity_IDs: string;
    constructor() { }
}
export interface IbostateResponse {
    total: number;
    results: bostate[];
}

