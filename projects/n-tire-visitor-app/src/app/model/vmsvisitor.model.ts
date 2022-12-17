export class vmsvisitor {
public visitoriddesc :string;public visitorid :number;public visitorreference :string;public visitortype :string;public visitortypedesc :string;public fullname :string;public thumbnail :string;public purpose :string;public purposedesc :string;public other :string;public phone :string;public company :string;public address :string;public arrivaldate :Date;public arrivaltime :string;public duration :string;public emailaddress :string;public host :number;public hostdesc :string;public meetingplace :string;public meetingplacedesc :string;public designationid :string;public designationiddesc :string;public departmentid :number;public departmentiddesc :string;public mobile :string;public items :string;public idprooftype :string;public idprooftypedesc :string;public idproof :string;public rating :string;public ratingdesc :string;public carregistrationno :string;public parkingslot :number;public parkingslotdesc :string;public exitdate :Date;public exittime :string;public notes :string;public visitorstatus :string;public visitorstatusdesc :string;public approvalremarks :string;public instructions :string;public history :string;public invitationid :number;public status :string;public customfield :string;public attachment :string;public visitormasterid :number;public visitormasteriddesc :string;
constructor() {}
}
export interface IvmsvisitorResponse {
total: number;
results: vmsvisitor[];
}

