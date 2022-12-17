export class hrmsquestionmaster {
public qmiddesc :string;public qmid :number;public roleid :number;public roleiddesc :string;public category :number;public categorydesc :string;public subcategory :number;public subcategorydesc :string;public question :string;public answer :string;public answermode :string;public answermodedesc :string;public dropdownvalues :string;public rating :number;public status :string;
constructor() {}
}
export interface IhrmsquestionmasterResponse {
total: number;
results: hrmsquestionmaster[];
}

