export class bodatamasking {
public datamaskiddesc :string;public datamaskid :number;public tablename :string;public fieldname :string;public masklogic :string;public status :string;public DeletedbosecurityquestionIDs :string;public DeletedbodatamaskingrolerestrictIDs :string;
constructor() {}
}
export interface IbodatamaskingResponse {
total: number;
results: bodatamasking[];
}

