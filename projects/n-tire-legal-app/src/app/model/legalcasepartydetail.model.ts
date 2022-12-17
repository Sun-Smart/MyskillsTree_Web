export class legalcasepartydetail {
public caseid :number;public partyiddesc :string;public partyid :number;public partytype :number;public partytypedesc :string;public partyname :string;public position :string;public positiondesc :string;public gender :string;public genderdesc :string;public mobilenumber :string;public emailid :string;public dateofbirth :Date;public address1 :string;public address2 :string;public city :string;public contactperson :string;public cpmobilenumber :string;public cpemail :string;public rating :number;public comments :string;public attachment :string;public status :string;
constructor() {}
}
export interface IlegalcasepartydetailResponse {
total: number;
results: legalcasepartydetail[];
}

