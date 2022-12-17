export class camspmscheduleuser {
public scheduleuseriddesc :string;public scheduleuserid :number;public scheduleid :number;public scheduleiddesc :string;public pmid :number;public pmiddesc :string;public userid :number;public useriddesc :string;public alltasks :boolean;public taskid :number;public taskiddesc :string;public tat :string;public rating :number;public notes :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspmscheduleuserResponse {
total: number;
results: camspmscheduleuser[];
}

