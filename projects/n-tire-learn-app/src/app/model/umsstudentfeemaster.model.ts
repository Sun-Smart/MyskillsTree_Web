export class umsstudentfeemaster {
    public studentfeeid: number; public studentid: number; public financialyearid: number; public financialyeariddesc: string; public courseid: number; public courseiddesc: string; public semesterid: number; public semesteriddesc: string; public feestructureid: number; public feestructureiddesc: string; public totalfee: number; public startdate: Date; public enddate: Date; public paid: boolean; public paiddate: Date; public paidtype: string; public paidtypedesc: string; public chequeno: string; public chequedate: Date; public bankname: string; public transactionid: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IumsstudentfeemasterResponse {
    total: number;
    results: umsstudentfeemaster[];
}

