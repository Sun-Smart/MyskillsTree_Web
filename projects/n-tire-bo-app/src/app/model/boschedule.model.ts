export class boschedule {
public scheduleiddesc :string;public scheduleid :number;public sourcefield :string;public sourcereference :number;public procedurename :string;public frequency :string;public frequencydesc :string;public notifiers :string;public lastrundate :Date;public successrate :number;public failurerate :number;public status :string;public DeletedboschedulerunIDs :string;
constructor() {}
}
export interface IboscheduleResponse {
total: number;
results: boschedule[];
}

