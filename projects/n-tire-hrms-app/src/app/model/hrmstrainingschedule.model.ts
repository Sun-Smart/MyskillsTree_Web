export class hrmstrainingschedule {
public trainingid :number;public trainingiddesc :string;public scheduleiddesc :string;public scheduleid :number;public scheduledate :Date;public topic :string;public fromtime :string;public totime :string;public trainer :string;public status :string;
constructor() {}
}
export interface IhrmstrainingscheduleResponse {
total: number;
results: hrmstrainingschedule[];
}

