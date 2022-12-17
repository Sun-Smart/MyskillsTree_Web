export class umssectionmaster {
    public sectionid: number; public sectionname: string; public maxstrength: number; public status: string; public DeletedumssectionstudentIDs: string;
    constructor() { }
}
export interface IumssectionmasterResponse {
    total: number;
    results: umssectionmaster[];
}

