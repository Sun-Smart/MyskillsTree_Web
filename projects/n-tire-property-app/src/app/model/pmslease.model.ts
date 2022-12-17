export class pmslease {
public leaseiddesc :string;public leaseid :number;public description :string;public propertyid :number;public propertyiddesc :string;public unitid :number;public unitiddesc :string;public tenantid :number;public tenantiddesc :string;public ownerid :number;public owneriddesc :string;public leasetype :string;public leasetypedesc :string;public datesigned :Date;public startdate :Date;public enddate :Date;public rentcycle :string;public rentcycledesc :string;public rentamount :number;public securitydeposit :number;public securitydepositduedate :Date;public depositreceived :number;public depositrefunded :number;public depositheld :number;public nextduedate :Date;public noticeperioddays :number;public penaltycyclecount :number;public penaltyamount :number;public rentescalationpercent :number;public rentescalationmonths :number;public nextescalationdate :Date;public balancedue :number;public attachment :string;public notes :string;public status :string;public DeletedpmstransactionIDs :string;public DeletedpmstransactionscheduleIDs :string;public DeletedpmschargeIDs :string;public DeletedpmsdepositIDs :string;public DeletedpmsworkorderIDs :string;
constructor() {}
}
export interface IpmsleaseResponse {
total: number;
results: pmslease[];
}

