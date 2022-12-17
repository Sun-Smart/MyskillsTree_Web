export class hrmsemployeeeducation {
public employeeid :number;public haeiddesc :string;public haeid :number;public education :number;public educationdesc :string;public specialization :string;public institution :string;public countryid :number;public fromyear :number;public toyear :number;public qualificationmode :string;public qualificationmodedesc :string;public percentage :number;public grade :string;public gradedesc :string;public details :string;public completionstatus :string;public completionstatusdesc :string;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeeducationResponse {
total: number;
results: hrmsemployeeeducation[];
}

