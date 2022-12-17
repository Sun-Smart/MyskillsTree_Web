export class erprfqdetail {
public rfqdetailiddesc :string;public rfqdetailid :number;public rfqid :number;public rfqiddesc :string;public itemid :number;public itemiddesc :string;public itemdescription :string;public itemtype :string;public itemtypedesc :string;public itemcategory :number;public itemcategorydesc :string;public quantity :string;public uom :string;public uomdesc :string;public requiredbefore :Date;public supplierid :number;public supplieriddesc :string;public approvalstatus :string;public approvalstatusdesc :string;public approvedby :number;public approvedbydesc :string;public status :string;public DeletederprfqsupplierIDs :string;
constructor() {}
}
export interface IerprfqdetailResponse {
total: number;
results: erprfqdetail[];
}

