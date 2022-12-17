export class prjprojectrequirement {
public projectid :number;public projectiddesc :string;public requirementiddesc :string;public requirementid :number;public requirement :string;public authorid :number;public authoriddesc :string;public reviewerid :number;public revieweriddesc :string;public tousers :string;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IprjprojectrequirementResponse {
total: number;
results: prjprojectrequirement[];
}

