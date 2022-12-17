export class hrmsdependantdetail {
public employeeid :number;public dependentiddesc :string;public dependentid :number;public dependantcategory :string;public dependantcategorydesc :string;public name :string;public gender :string;public genderdesc :string;public dob :Date;public nominee :string;public maritalstatus :string;public maritalstatusdesc :string;public status :string;
constructor() {}
}
export interface IhrmsdependantdetailResponse {
total: number;
results: hrmsdependantdetail[];
}

