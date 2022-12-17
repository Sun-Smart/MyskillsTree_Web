export class camspmscheduleitem {
public scheduleitemiddesc :string;public scheduleitemid :number;public scheduleid :number;public scheduleiddesc :string;public pmid :number;public pmiddesc :string;public itemid :number;public itemiddesc :string;public quantity :number;public alltasks :boolean;public taskid :number;public taskiddesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspmscheduleitemResponse {
total: number;
results: camspmscheduleitem[];
}

