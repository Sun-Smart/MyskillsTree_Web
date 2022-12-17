export class erptendercorrigendum {
public tenderid :number;public tenderiddesc :string;public corrigendumiddesc :string;public corrigendumid :number;public corrigendumdate :Date;public description :string;public notes :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IerptendercorrigendumResponse {
total: number;
results: erptendercorrigendum[];
}

