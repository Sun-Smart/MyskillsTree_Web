export class boconfigvalue {
    constructor(public configid: number, public param: string, public configkey: string, public configtext: string, public status: string) { }
}
export interface IboconfigvalueResponse {
    total: number;
    results: boconfigvalue[]=[];
}

