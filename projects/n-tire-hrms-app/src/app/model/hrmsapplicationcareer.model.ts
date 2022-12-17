export class hrmsapplicationcareer {
    public applicantid: number; public hacid: number; public employer: string; public fromdate: Date; public todate: Date; public totalmonths: number; public designation: string; public mappedtoourrole: number; public mappedtoourroledesc: string; public responsibilities: string; public currency: string; public currencydesc: string; public salary: number; public remarks: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhrmsapplicationcareerResponse {
    total: number;
    results: hrmsapplicationcareer[];
}

