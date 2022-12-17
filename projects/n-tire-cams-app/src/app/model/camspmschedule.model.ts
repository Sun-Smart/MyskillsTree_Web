export class camspmschedule {
public scheduleiddesc :string;public scheduleid :number;public reference :string;public description :string;public worktype :string;public worktypedesc :string;public assetid :number;public assetiddesc :string;public pmlocationid :number;public pmlocationiddesc :string;public pmtype :string;public pmtypedesc :string;public measurementmeter :string;public measurementmeterdesc :string;public meterreadingstart :number;public meterfrequency :number;public pmdue :number;public lowerthresholdlimit :number;public upperthresholdlimit :number;public frequencyunit :string;public frequencyunitdesc :string;public frequency :number;public days :string;public pmgenerationtype :string;public pmgenerationtypedesc :string;public startdate :Date;public enddate :Date;public nextstartdate :Date;public notes :string;public remarks :string;public pmstatus :string;public pmstatusdesc :string;public status :string;public pmid :number;public pmiddesc :string;public DeletedcamspmscheduletaskIDs :string;public DeletedcamspmscheduleinstructionIDs :string;public DeletedcamspmscheduleitemIDs :string;public DeletedcamspmschedulesuppliertaskIDs :string;public DeletedcamspmscheduleuserIDs :string;
constructor() {}
}
export interface IcamspmscheduleResponse {
total: number;
results: camspmschedule[];
}

