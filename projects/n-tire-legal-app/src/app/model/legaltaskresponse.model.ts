export class legaltaskresponse {
public responseiddesc :string;public responseid :number;public taskid :number;public workdate :Date;public hoursspent :string;public comments :string;public cost :string;public nextactiondate :Date;public attachment :string;public status :string;
constructor() {}
}
export interface IlegaltaskresponseResponse {
total: number;
results: legaltaskresponse[];
}

