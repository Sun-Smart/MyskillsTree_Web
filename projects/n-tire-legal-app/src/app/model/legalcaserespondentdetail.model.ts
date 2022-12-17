export class legalcaserespondentdetail {
public caseid :number;public respondentiddesc :string;public respondentid :number;public respondenttype :number;public respondenttypedesc :string;public respondentname :string;public gender :string;public genderdesc :string;public mobilenumber :string;public emailid :string;public dateofbirth :Date;public address1 :string;public address2 :string;public city :string;public contactperson :string;public cpmobilenumber :string;public cpemail :string;public rating :number;public attachment :string;public status :string;
constructor() {}
}
export interface IlegalcaserespondentdetailResponse {
total: number;
results: legalcaserespondentdetail[];
}

