export class vmsvisitormaster {
public visitormasteriddesc :string;public visitormasterid :number;public reference :string;public visitortype :string;public visitortypedesc :string;public fullname :string;public thumbnail :string;public purpose :string;public purposedesc :string;public phone :string;public company :string;public address :string;public emailaddress :string;public host :number;public hostdesc :string;public meetingplace :string;public meetingplacedesc :string;public designationid :string;public designationiddesc :string;public departmentid :number;public departmentiddesc :string;public mobile :string;public idprooftype :string;public idprooftypedesc :string;public idproof :string;public carregistrationno :string;public approvalremarks :string;public instructions :string;public visitorstatus :string;public visitorstatusdesc :string;public history :string;public status :string;
constructor() {}
}
export interface IvmsvisitormasterResponse {
total: number;
results: vmsvisitormaster[];
}

