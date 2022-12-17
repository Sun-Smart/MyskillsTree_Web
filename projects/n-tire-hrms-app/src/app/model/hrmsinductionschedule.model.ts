export class hrmsinductionschedule {
public inductionid :number;public scheduleiddesc :string;public scheduleid :number;public scheduledate :Date;public topic :string;public fromtime :string;public totime :string;public trainer :string;public status :string;
constructor() {}
}
export interface IhrmsinductionscheduleResponse {
total: number;
results: hrmsinductionschedule[];
}

