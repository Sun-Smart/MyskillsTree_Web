export class flmusage {
    public usageid: number; public description: string; public notes: string; public status: string;
    constructor() { }
}
export interface IflmusageResponse {
    total: number;
    results: flmusage[];
}

