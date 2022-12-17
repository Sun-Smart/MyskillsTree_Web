export class erpcontractorderdetails {
    public contractid: number; public supplierid: number; public versionnumber: number; public contractdetailid: number; public detailtype: string; public detailtypedesc: string; public itemid: number; public itemiddesc: string; public service: string; public quantity: number; public uom: string; public uomdesc: string; public currency: string; public currencydesc: string; public unitprice: string; public discountpercent: number; public discounttype: string; public discounttypedesc: string; public saleprice: number; public tax1name: number; public tax1value: string; public tax2name: number; public tax2value: string; public othercharges: string; public totalquotevalue: string; public basecurrency: number; public basevalue: string; public expecteddelivery: Date; public size: string; public color: string; public weight: string; public notes: string; public paymenttermtype: string; public paymenttermtypedesc: string; public remarks: string; public status: string;
    constructor() { }
}
export interface IerpcontractorderdetailsResponse {
    total: number;
    results: erpcontractorderdetails[];
}

