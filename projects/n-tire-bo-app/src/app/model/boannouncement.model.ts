export class boannouncement {
public announcementiddesc :string;public announcementid :number;public title :string;public description :string;public scheduledfromdate :Date;public scheduledfromtime :string;public scheduledtodate :Date;public scheduledtotime :string;public announcementtype :string;public announcementtypedesc :string;public priority :string;public prioritydesc :string;public services :number;public servicesdesc :string;public emailusers :string;public accessibility :string;public accessibilitydesc :string;public status :string;
constructor() {}
}
export interface IboannouncementResponse {
total: number;
results: boannouncement[];
}

