export class hrmsapplicantskill {
public applicantid :number;public applicantiddesc :string;public skilliddesc :string;public skillid :number;public skillcategory :string;public skillcategorydesc :string;public skilldescription :string;public noofyearsused :number;public lastusedyear :number;public rating :number;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsapplicantskillResponse {
total: number;
results: hrmsapplicantskill[];
}

