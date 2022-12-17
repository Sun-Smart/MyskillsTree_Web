export class hmstest {
    public testid: number; public testname: string; public cost: number; public instructions: string; public notes: string; public status: string;
    constructor() { }
}
export interface IhmstestResponse {
    total: number;
    results: hmstest[];
}

