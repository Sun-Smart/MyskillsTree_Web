export class erpdcmaster {
public dciddesc :string;public dcid :number;public branchid :number;public dcnumber :string;public dcdate :Date;public dctype :string;public referenceid :number;public totalpieces :number;public shipmode :number;public shippingcompany :string;public airwaybillnumber :string;public bookingdate :string;public expecteddeliveryby :Date;public shipto :string;public shiptocustomer :number;public shiptobranch :number;public shiptovendor :number;public contactperson :string;public contactnumber :string;public deliveryaddress1 :string;public deliveryaddress2 :string;public deliverycity :number;public deliverystate :number;public deliverypin :string;public deliverycountry :number;public deliverylatlong :string;public customfield :string;public attachment :string;public status :string;public DeletederpdcdetailIDs :string;
constructor() {}
}
export interface IerpdcmasterResponse {
total: number;
results: erpdcmaster[];
}

