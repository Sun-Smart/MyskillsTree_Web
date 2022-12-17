export class crmcustomeraccountmaster {
    public accountiddesc: string; public accountid: number; public customerid: number; public customeriddesc: string; public cifnumber: string; public accountnumber: string; public productid: number; public productiddesc: string; public accountopendate: Date; public holdingtype: string; public holdingtypedesc: string; public customerholding: string; public customerholdingdesc: string; public customfield: string; public attachment: string; public status: string; public Deleted_crmcustomeraccounttransaction_IDs: string;
    constructor() { }
}
export interface IcrmcustomeraccountmasterResponse {
    total: number;
    results: crmcustomeraccountmaster[];
}

