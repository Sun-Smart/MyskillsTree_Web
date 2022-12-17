export class vmsinviteperson {
public invitationid :number;public invitationpersoniddesc :string;public invitationpersonid :number;public firstname :string;public lastname :string;public email :string;public mobile :string;public language :string;public languagedesc :string;public reserveparking :boolean;public carregistrationno :string;public parkingslot :string;public invitestatus :string;public invitestatusdesc :string;public status :string;
constructor() {}
}
export interface IvmsinvitepersonResponse {
total: number;
results: vmsinviteperson[];
}

