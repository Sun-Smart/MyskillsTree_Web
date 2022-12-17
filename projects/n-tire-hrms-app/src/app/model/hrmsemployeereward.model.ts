export class hrmsemployeereward {
public employeeid :number;public rewardiddesc :string;public rewardid :number;public category :string;public categorydesc :string;public rewarddate :Date;public topic :string;public receivedfrom :string;public rewardtype :string;public rewardtypedesc :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeerewardResponse {
total: number;
results: hrmsemployeereward[];
}

