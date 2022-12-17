export class boschedulerun {
public scheduleruniddesc :string;public schedulerunid :number;public scheduleid :number;public procedurename :string;public rundatetime :Date;public runstatus :string;public runstatusdesc :string;public runduration :string;public notifiers :string;public notifiedstatus :string;public notifiedstatusdesc :string;public failurereason :string;public failurereasondesc :string;public failuretext :string;public status :string;
constructor() {}
}
export interface IboschedulerunResponse {
total: number;
results: boschedulerun[];
}

