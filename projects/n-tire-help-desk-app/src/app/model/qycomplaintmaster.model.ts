export class qycomplaintmaster {
public complaintiddesc :string;public complaintid :number;public branchid :number;public reference :string;public complaintdate :Date;public occurencedate :Date;public title :string;public complaintsource :string;public complaintsourcedesc :string;public complainername :string;public mobileno :string;public phoneno :string;public emailid :string;public complaintagainst :string;public complaintcategory :string;public complaintcategorydesc :string;public severity :string;public severitydesc :string;public complainttype :string;public complainttypedesc :string;public complaintdetails :string;public methodofcontact :string;public methodofcontactdesc :string;public contactperson :string;public actiontype :string;public actiontypedesc :string;public actiontakenby :string;public actiontakenon :Date;public actionstatus :string;public actionstatusdesc :string;public actionremarks :string;public brandname :string;public part :string;public modelnumber :string;public complaintqty :number;public catalognumber :string;public serialnumber :string;public uniquenumber :string;public customfield :string;public attachment :string;public status :string;public DeletedqyrelatedcomplaintIDs :string;
constructor() {}
}
export interface IqycomplaintmasterResponse {
total: number;
results: qycomplaintmaster[];
}

