export class qygrievancemaster {
public grievanceiddesc :string;public grievanceid :number;public branchid :number;public reference :string;public grievancedate :Date;public occurencedate :Date;public title :string;public grievancesource :string;public grievancesourcedesc :string;public grievanceby :number;public complainantname :string;public gender :string;public genderdesc :string;public relationship :string;public relationshipdesc :string;public mobileno :string;public phoneno :string;public emailid :string;public complainantaddress :string;public grievanceagainst :string;public defendantaddress :string;public onbehalf :string;public grievancecategory :string;public grievancecategorydesc :string;public severity :string;public severitydesc :string;public grievancetype :string;public grievancetypedesc :string;public grievancedetails :string;public methodofcontact :string;public contactperson :string;public comments :string;public allcomments :string;public actiontype :string;public actiontakenby :string;public actiontakenon :Date;public actionstatus :string;public actionstatusdesc :string;public actionremarks :string;public customfield :string;public attachment :string;public status :string;public DeletedqyrelatedgrievanceIDs :string;
constructor() {}
}
export interface IqygrievancemasterResponse {
total: number;
results: qygrievancemaster[];
}

