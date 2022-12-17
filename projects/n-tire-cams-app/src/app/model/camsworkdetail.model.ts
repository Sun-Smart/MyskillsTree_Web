export class camsworkdetail {
public workorderdetailiddesc :string;public workorderdetailid :number;public workorderid :number;public workorderiddesc :string;public pmid :number;public pmiddesc :string;public pmtaskid :number;public pmtaskiddesc :string;public taskdescription :string;public tasktype :string;public tasktypedesc :string;public meterreading :string;public workhrs :string;public workperioddays :number;public orderno :number;public predecessor :string;public remarks :string;public userid :number;public useriddesc :string;public labourrate :string;public plannedstartdate :Date;public plannedenddate :Date;public actualstartdate :Date;public actualenddate :Date;public delayedstart :string;public actualworkhrs :string;public travelduration :string;public travelrate :string;public losttime :string;public lostrate :string;public lostratedesc :string;public workstatus :string;public workstatusdesc :string;public status :string;public scheduleid :number;public scheduletaskid :number;public DeletedcamsworktimelogIDs :string;public DeletedcamsworkinstructionIDs :string;public DeletedcamsworkitemIDs :string;
constructor() {}
}
export interface IcamsworkdetailResponse {
total: number;
results: camsworkdetail[];
}

