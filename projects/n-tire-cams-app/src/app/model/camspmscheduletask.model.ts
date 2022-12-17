export class camspmscheduletask {
public scheduletaskiddesc :string;public scheduletaskid :number;public scheduleid :number;public scheduleiddesc :string;public pmid :number;public pmiddesc :string;public pmtaskid :number;public pmtaskiddesc :string;public taskdescription :string;public tasktype :string;public tasktypedesc :string;public meterreadingstate :string;public meterreadingstatedesc :string;public workhrs :string;public workperioddays :number;public orderno :number;public predecessor :string;public durationfromstart :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspmscheduletaskResponse {
total: number;
results: camspmscheduletask[];
}

