export class ltycustomerlevel {
public customerleveliddesc :string;public customerlevelid :number;public levelid :number;public leveliddesc :string;public customerid :number;public customeriddesc :string;public oldlevelid :number;public oldleveliddesc :string;public batch :string;public status :string;
constructor() {}
}
export interface IltycustomerlevelResponse {
total: number;
results: ltycustomerlevel[];
}

