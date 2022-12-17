export class erpproductimage {
public imageiddesc :string;public imageid :number;public productid :number;public productiddesc :string;public image :string;public htmlcontent :string;public sortorder :number;public status :string;
constructor() {}
}
export interface IerpproductimageResponse {
total: number;
results: erpproductimage[];
}

