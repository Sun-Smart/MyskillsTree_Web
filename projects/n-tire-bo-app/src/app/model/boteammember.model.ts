export class boteammember {
public teamid :number;public teamiddesc :string;public teammemberiddesc :string;public teammemberid :number;public userid :number;public useriddesc :string;public startdate :Date;public enddate :Date;public rateperhour :number;public memberstatus :string;public memberstatusdesc :string;public status :string;
constructor() {}
}
export interface IboteammemberResponse {
total: number;
results: boteammember[];
}

