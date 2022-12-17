export class boauditevents {
public auditeventiddesc :string;public auditeventid :number;public sourcefield :string;public sourcereference :number;public eventdate :Date;public details :string;public status :string;
constructor() {}
}
export interface IboauditeventsResponse {
total: number;
results: boauditevents[];
}

