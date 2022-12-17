export class dmslinkedfolder {
public linkediddesc :string;public linkedid :number;public folderid :number;public folderiddesc :string;public linkedfolderid :number;public linkedfolderiddesc :string;public linktype :string;public linktypedesc :string;public status :string;
constructor() {}
}
export interface IdmslinkedfolderResponse {
total: number;
results: dmslinkedfolder[];
}

