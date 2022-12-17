export class erpgoodsreceiptmaster {
public branchid :number;public branchiddesc :string;public supplierid :number;public supplieriddesc :string;public grniddesc :string;public grnid :number;public grnnumber :string;public grndate :Date;public grntype :string;public grntypedesc :string;public grntypereference :string;public dcnumber :string;public dcdate :Date;public ponumber :number;public ponumberdesc :string;public poversionno :number;public supplieraddress :string;public suppliercontactperson :string;public supplierbillingaddress :string;public receivedby :number;public receivedbydesc :string;public assignedto :string;public transportername :string;public vehicledetails :string;public shipmentdetails :string;public packinglistno :string;public freightcontainer :string;public containers :number;public airbill :string;public billoflading :string;public warehouseid :number;public warehouseiddesc :string;public accountid :number;public accountiddesc :string;public totalvalue :number;public taxamount :number;public charges :number;public deductedtaxamount :number;public nettaxamount :number;public additionaldiscountpercentage :number;public additionaldiscountamount :number;public netamount :string;public currency :string;public customfield :string;public attachment :string;public grnremarks :string;public status :string;public DeletederpgoodsreceiptdetailIDs :string;
constructor() {}
}
export interface IerpgoodsreceiptmasterResponse {
total: number;
results: erpgoodsreceiptmaster[];
}

