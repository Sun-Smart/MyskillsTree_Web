export class vmsinvitation {
public invitationiddesc :string;public invitationid :number;public invitereference :string;public branchid :number;public branchiddesc :string;public eventreference :number;public eventreferencedesc :string;public company :string;public subject :string;public notes :string;public visitortype :string;public visitortypedesc :string;public host :number;public hostdesc :string;public validfromdate :Date;public validfromtime :string;public validtodate :Date;public validtotime :string;public repeattype :string;public repeattypedesc :string;public messagetoguest :string;public invitestatus :string;public invitestatusdesc :string;public watch :boolean;public replytoname :string;public replytoemail :string;public status :string;public DeletedvmsinvitepersonIDs :string;
constructor() {}
}
export interface IvmsinvitationResponse {
total: number;
results: vmsinvitation[];
}

