export class hrmsemployeelanguageskill {
public employeeid :number;public languageiddesc :string;public languageid :number;public language :string;public languagedesc :string;public reading :boolean;public readinglevel :string;public readingleveldesc :string;public write :boolean;public writinglevel :string;public writingleveldesc :string;public speak :boolean;public speakinglevel :string;public speakingleveldesc :string;public knownsince :Date;public lastused :Date;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeelanguageskillResponse {
total: number;
results: hrmsemployeelanguageskill[];
}

