export class recfolder {
public folderiddesc :string;public folderid :number;public foldername :string;public parentid :number;public parentiddesc :string;public status :string;
constructor() {}
}
export interface IrecfolderResponse {
total: number;
results: recfolder[];
}

