export class camspmscheduleinstruction {
public scheduleinstructioniddesc :string;public scheduleinstructionid :number;public scheduleid :number;public scheduleiddesc :string;public pmid :number;public pmiddesc :string;public sequence :number;public code :string;public details :string;public alltasks :boolean;public taskid :number;public taskiddesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspmscheduleinstructionResponse {
total: number;
results: camspmscheduleinstruction[];
}

