export class camsdepreciationschedule {
public scheduleiddesc :string;public scheduleid :number;public assetid :number;public assetiddesc :string;public year :number;public currentdepreciation :number;public cumulativedepreciation :number;public bookvalue :number;public status :string;
constructor() {}
}
export interface IcamsdepreciationscheduleResponse {
total: number;
results: camsdepreciationschedule[];
}

