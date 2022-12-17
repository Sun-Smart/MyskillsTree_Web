export class erpqcdetail {
public branchid :number;public grnid :number;public grniddesc :string;public grnnumber :number;public grndetailsid :number;public qcid :number;public qciddesc :string;public qcdetailiddesc :string;public qcdetailid :number;public itemid :number;public uom :number;public currentdelivery :string;public qccleared :string;public qcfailed :string;public status :string;
constructor() {}
}
export interface IerpqcdetailResponse {
total: number;
results: erpqcdetail[];
}

