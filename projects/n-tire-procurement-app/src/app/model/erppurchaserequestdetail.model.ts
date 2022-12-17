export class erppurchaserequestdetail {
public prsid :number;public prsiddesc :string;public prsdetailiddesc :string;public prsdetailid :number;public itemcategory :number;public itemcategorydesc :string;public itemsubcategory :number;public itemsubcategorydesc :string;public itemid :number;public itemiddesc :string;public itemdescription :string;public details :string;public uom :string;public uomdesc :string;public quantity :string;public requiredbefore :Date;public prsremarks :string;public currencyid :string;public currencyiddesc :string;public cost :number;public totalcost :number;public tax1 :string;public tax2 :string;public othercharges :string;public netamount :number;public budget :number;public used :number;public available :number;public rfqid :number;public rfqiddesc :string;public poid :number;public poiddesc :string;public supplierid :number;public supplieriddesc :string;public accountid :number;public accountiddesc :string;public approvalstatus :string;public approvalstatusdesc :string;public approvedby :number;public approvedbydesc :string;public status :string;
constructor() {}
}
export interface IerppurchaserequestdetailResponse {
total: number;
results: erppurchaserequestdetail[];
}

