export class legalmatterresponse {
public matterresponseiddesc :string;public matterresponseid :number;public matterid :number;public workdate :Date;public hoursspent :string;public comments :string;public cost :string;public nextactiondate :Date;public attachment :string;public status :string;
constructor() {}
}
export interface IlegalmatterresponseResponse {
total: number;
results: legalmatterresponse[];
}

