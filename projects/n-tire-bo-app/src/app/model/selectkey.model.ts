export class selectkey {
    public pkdesc: string; public pk: number; public param: string; public keyval: number; public keyvaldesc: string; public status: string;
    constructor() { }
}
export interface IselectkeyResponse {
    total: number;
    results: selectkey[];
}

