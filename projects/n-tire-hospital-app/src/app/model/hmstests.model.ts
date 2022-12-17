export class hmstests {
    public testid: number; public testname: string; public cost: number; public instructions: string; public notes: string; public status: string;
    constructor() { }
}
export interface IhmstestsResponse {
    total: number;
    results: hmstests[];
}

