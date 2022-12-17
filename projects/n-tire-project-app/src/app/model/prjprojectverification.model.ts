export class prjprojectverification {
public projectid :number;public projectiddesc :string;public verificationiddesc :string;public verificationid :number;public verification :string;public verificationstage :string;public verificationstagedesc :string;public verificationby :number;public verificationbydesc :string;public reviewedby :number;public reviewedbydesc :string;public verificationdate :Date;public verificationresult :string;public verificationresultdesc :string;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IprjprojectverificationResponse {
total: number;
results: prjprojectverification[];
}

