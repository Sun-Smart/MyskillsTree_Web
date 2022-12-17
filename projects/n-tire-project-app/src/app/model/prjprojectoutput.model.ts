export class prjprojectoutput {
public projectid :number;public projectiddesc :string;public outputiddesc :string;public outputid :number;public output :string;public outputby :number;public outputbydesc :string;public verifiedby :number;public verifiedbydesc :string;public verifieddate :Date;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IprjprojectoutputResponse {
total: number;
results: prjprojectoutput[];
}

