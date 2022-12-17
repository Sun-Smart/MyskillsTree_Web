export class bocountry {
    public countryiddesc: string; public countryid: number; public code: string; public name: string; public status: string; public Deleted_bostate_IDs: string;
    constructor() { }
}
export interface IbocountryResponse {
    total: number;
    results: bocountry[];
}

