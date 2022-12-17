export class dmslink {
public linkiddesc :string;public linkid :number;public documentid :number;public documentiddesc :string;public url :string;public linktype :string;public linktypedesc :string;public rank :number;public status :string;
constructor() {}
}
export interface IdmslinkResponse {
total: number;
results: dmslink[];
}

