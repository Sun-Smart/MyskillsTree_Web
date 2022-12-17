export class hrmskramaster {
public kraiddesc :string;public kraid :number;public kraname :string;public kraweightagepercent :number;public attachment :string;public status :string;public DeletedhrmskpimasterIDs :string;
constructor() {}
}
export interface IhrmskramasterResponse {
total: number;
results: hrmskramaster[];
}

