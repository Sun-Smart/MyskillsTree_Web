export class dmssubscription {
public subscriptioniddesc :string;public subscriptionid :number;public documentid :number;public documentiddesc :string;public userid :number;public useriddesc :string;public subscribeddate :Date;public subscriptionstatus :string;public subscriptionstatusdesc :string;public status :string;
constructor() {}
}
export interface IdmssubscriptionResponse {
total: number;
results: dmssubscription[];
}

