export class dmsmimetype {
public mimetypeiddesc :string;public mimetypeid :number;public filetype :string;public filetypedesc :string;public mimetype :string;public mimetypedesc :string;public icon :string;public status :string;
constructor() {}
}
export interface IdmsmimetypeResponse {
total: number;
results: dmsmimetype[];
}

