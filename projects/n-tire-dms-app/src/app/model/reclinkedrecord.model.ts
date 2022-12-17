export class reclinkedrecord {
public linkedrecordiddesc :string;public linkedrecordid :number;public recordid :number;public recordiddesc :string;public fkrecordid :number;public status :string;
constructor() {}
}
export interface IreclinkedrecordResponse {
total: number;
results: reclinkedrecord[];
}

