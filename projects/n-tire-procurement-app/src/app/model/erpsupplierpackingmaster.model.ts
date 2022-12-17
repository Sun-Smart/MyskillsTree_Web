export class erpsupplierpackingmaster {
public poid :number;public poiddesc :string;public supplierpkgiddesc :string;public supplierpkgid :number;public branchid :number;public branchiddesc :string;public packinglotnumber :string;public totalpieces :number;public shipmode :string;public shipmodedesc :string;public shippingcompany :string;public airwaybillnumber :string;public bookingdate :Date;public expecteddeliveryby :Date;public customfield :string;public attachment :string;public status :string;public DeletederpsupplierpackingdetailIDs :string;
constructor() {}
}
export interface IerpsupplierpackingmasterResponse {
total: number;
results: erpsupplierpackingmaster[];
}

