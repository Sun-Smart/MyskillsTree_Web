export class bomeetinginvite {
public meetingid :number;public inviteeiddesc :string;public inviteeid :number;public firstname :string;public lastname :string;public email :string;public mobile :string;public status :string;
constructor() {}
}
export interface IbomeetinginviteResponse {
total: number;
results: bomeetinginvite[];
}

