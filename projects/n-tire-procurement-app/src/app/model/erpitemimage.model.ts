export class erpitemimage {
public imageiddesc :string;public imageid :number;public itemid :number;public itemiddesc :string;public image :string;public htmlcontent :string;public sortorder :number;public status :string;
constructor() {}
}
export interface IerpitemimageResponse {
total: number;
results: erpitemimage[];
}

