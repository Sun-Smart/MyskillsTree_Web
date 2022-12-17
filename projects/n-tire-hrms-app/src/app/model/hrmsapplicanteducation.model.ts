export class hrmsapplicanteducation {
public applicantid :number;public applicantiddesc :string;public haeiddesc :string;public haeid :number;public education :string;public educationdesc :string;public specialization :string;public fromyear :number;public toyear :number;public institution :string;public percentage :number;public grade :string;public gradedesc :string;public remarks :string;public completionstatus :string;public completionstatusdesc :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsapplicanteducationResponse {
total: number;
results: hrmsapplicanteducation[];
}

