export class bomeetingreminder {
public reminderiddesc :string;public reminderid :number;public meetingid :number;public screenid :string;public screeniddesc :string;public relatedid :number;public reminder :string;public reminderdesc :string;public emailinvitees :boolean;public inviteesremindertime :string;public inviteesremindertimedesc :string;public status :string;
constructor() {}
}
export interface IbomeetingreminderResponse {
total: number;
results: bomeetingreminder[];
}

