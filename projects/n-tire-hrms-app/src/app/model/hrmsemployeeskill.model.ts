export class hrmsemployeeskill {
public employeeid :number;public skilliddesc :string;public skillid :number;public skillcategory :number;public skillcategorydesc :string;public skilldescription :string;public noofyearsused :number;public lastusedyear :number;public rating :number;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeskillResponse {
total: number;
results: hrmsemployeeskill[];
}

