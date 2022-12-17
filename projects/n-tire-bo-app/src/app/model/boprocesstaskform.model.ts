export class boprocesstaskform {
public taskformiddesc :string;public taskformid :number;public taskprocessid :number;public processgroupid :number;public processid :number;public formid :number;public formiddesc :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IboprocesstaskformResponse {
total: number;
results: boprocesstaskform[];
}

