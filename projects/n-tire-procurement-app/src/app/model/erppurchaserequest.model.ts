export class erppurchaserequest {
public branchid :number;public branchiddesc :string;public departmentid :number;public departmentiddesc :string;public prsiddesc :string;public prsid :number;public prscode :string;public reference :string;public prsdate :Date;public description :string;public requireddate :Date;public requestedby :number;public requestedbydesc :string;public projectid :number;public projectiddesc :string;public deliverylocationid :number;public deliverylocationiddesc :string;public purchasereason :string;public purchasereasondesc :string;public criticality :string;public criticalitydesc :string;public notes :string;public prstype :string;public prstypedesc :string;public prscategory :string;public prscategorydesc :string;public supplierid :number;public supplieriddesc :string;public costcenterid :number;public costcenteriddesc :string;public requestedtotalcost :number;public prsremarks :string;public status :string;public poid :number;public poiddesc :string;public deliverystatus :string;public deliverystatusdesc :string;public expecteddeliverydate :Date;public delivered :boolean;public packinglistno :string;public approvalstatus :string;public approvalstatusdesc :string;public approvedby :number;public prsstatus :string;public prsstatusdesc :string;public DeletederppurchaserequestdetailIDs :string;
constructor() {}
}
export interface IerppurchaserequestResponse {
total: number;
results: erppurchaserequest[];
}

