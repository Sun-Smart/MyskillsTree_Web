export class bocallreminder {
public reminderiddesc :string;public reminderid :number;public callid :number;public calliddesc :string;public screenid :string;public screeniddesc :string;public relatedid :number;public remindertype :string;public remindertypedesc :string;public emailinvitees :boolean;public inviteesremindertime :string;public inviteesremindertimedesc :string;public status :string;
constructor() {}
}
export interface IbocallreminderResponse {
total: number;
results: bocallreminder[];
}

