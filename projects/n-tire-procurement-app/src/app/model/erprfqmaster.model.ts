export class erprfqmaster {
public rfqiddesc :string;public rfqid :number;public rfqcode :string;public rfqdate :Date;public duedate :Date;public closedate :Date;public shipto :number;public shiptodesc :string;public billto :number;public billtodesc :string;public description :string;public rfqremarks :string;public customfield :string;public attachment :string;public multicompanyrfq :boolean;public status :string;public approvalstatus :string;public approvalstatusdesc :string;public approvedby :number;public DeletederprfqsupplierIDs :string;public DeletederprfqdetailIDs :string;public DeletederppurchaserequestdetailIDs :string;
constructor() {}
}
export interface IerprfqmasterResponse {
total: number;
results: erprfqmaster[];
}

