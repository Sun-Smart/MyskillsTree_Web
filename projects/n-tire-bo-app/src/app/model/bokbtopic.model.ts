export class bokbtopic {
public kbtopiciddesc :string;public kbtopicid :number;public kbid :number;public kbiddesc :string;public description :string;public sequence :number;public contenttype :string;public contenttypedesc :string;public contenttext :string;public contenturl :string;public status :string;
constructor() {}
}
export interface IbokbtopicResponse {
total: number;
results: bokbtopic[];
}

