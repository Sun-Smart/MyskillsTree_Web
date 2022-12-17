export class hmslabresult {
    public labtestid: number; public patientid: number; public testdate: Date; public testid: number; public testname: string; public testby: number; public normalrange: string; public result: string; public notes: string; public observations: string; public conclusion: string; public remarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmslabresultResponse {
    total: number;
    results: hmslabresult[];
}

