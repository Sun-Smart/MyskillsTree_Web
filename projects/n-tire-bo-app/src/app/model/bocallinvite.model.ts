export class bocallinvite {
public callid :number;public calliddesc :string;public inviteeiddesc :string;public inviteeid :number;public firstname :string;public lastname :string;public email :string;public mobile :string;public status :string;
constructor() {}
}
export interface IbocallinviteResponse {
total: number;
results: bocallinvite[];
}

