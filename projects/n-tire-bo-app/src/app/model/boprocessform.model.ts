export class boprocessform {
public processformiddesc :string;public processformid :number;public processgroupid :number;public processid :number;public formtype :string;public formid :number;public formiddesc :string;public menuid :number;public menuiddesc :string;public orderno :number;public status :string;
constructor() {}
}
export interface IboprocessformResponse {
total: number;
results: boprocessform[];
}

