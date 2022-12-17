export class vmsemployeeparcel {
public parceliddesc :string;public parcelid :number;public deliverycompany :string;public deliveryperson :string;public deliverydate :Date;public deliverytime :string;public employeeid :number;public employeeiddesc :string;public packagephoto :string;public contents :string;public notes :string;public receivedbyid :number;public receivedbyiddesc :string;public collectedstatus :string;public collectedstatusdesc :string;public collecteddatetime :Date;public status :string;
constructor() {}
}
export interface IvmsemployeeparcelResponse {
total: number;
results: vmsemployeeparcel[];
}

