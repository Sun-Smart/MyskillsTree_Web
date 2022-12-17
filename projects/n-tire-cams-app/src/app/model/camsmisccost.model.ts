export class camsmisccost {
public costiddesc :string;public costid :number;public workorderid :number;public workorderiddesc :string;public costtype :string;public costtypedesc :string;public description :string;public estimatedunitcost :number;public estimatedquantity :number;public estimatedcost :number;public actualquantity :number;public actualunitcost :number;public totalcost :number;public approvalstatus :string;public approvalstatusdesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamsmisccostResponse {
total: number;
results: camsmisccost[];
}

