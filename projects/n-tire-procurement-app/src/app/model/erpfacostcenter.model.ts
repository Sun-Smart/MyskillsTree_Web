export class erpfacostcenter {
    public ccid: number; public costcenterid: number; public mode: string; public modedesc: string; public query: string; public costcentercode: string; public costcentername: string; public budget: number; public status: string;
    constructor() { }
}
export interface IerpfacostcenterResponse {
    total: number;
    results: erpfacostcenter[];
}

