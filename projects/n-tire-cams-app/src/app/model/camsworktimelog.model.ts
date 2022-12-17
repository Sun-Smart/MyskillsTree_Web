export class camsworktimelog {
public logiddesc :string;public logid :number;public workorderdetailid :number;public workorderdetailiddesc :string;public workorderid :number;public workorderiddesc :string;public scheduleid :number;public scheduletaskid :number;public pmid :number;public pmiddesc :string;public pmtaskid :number;public pmtaskiddesc :string;public taskdescription :string;public tasktype :string;public tasktypedesc :string;public meterreading :string;public userid :number;public useriddesc :string;public workeddate :Date;public workduration :string;public travelduration :string;public losttime :string;public comments :string;public status :string;public DeletedcamsworkreadingIDs :string;
constructor() {}
}
export interface IcamsworktimelogResponse {
total: number;
results: camsworktimelog[];
}

