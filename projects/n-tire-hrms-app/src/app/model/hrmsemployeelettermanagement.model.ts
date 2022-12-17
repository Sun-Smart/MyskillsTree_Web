export class hrmsemployeelettermanagement {
public letteriddesc :string;public letterid :number;public employeeid :number;public date :Date;public lettercategory :string;public lettercategorydesc :string;public template :string;public letterdetails :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeelettermanagementResponse {
total: number;
results: hrmsemployeelettermanagement[];
}

