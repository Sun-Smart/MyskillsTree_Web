export class bosecurityquestion {
public questioniddesc :string;public questionid :number;public questionname :string;public datamaskid :number;public tablename :string;public fieldname :string;public mode :string;public modedesc :string;public status :string;
constructor() {}
}
export interface IbosecurityquestionResponse {
total: number;
results: bosecurityquestion[];
}

