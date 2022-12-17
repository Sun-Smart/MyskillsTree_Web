export class dmsdownloadqueue {
public queueiddesc :string;public queueid :number;public folderid :number;public folderiddesc :string;public requestedby :number;public requestedbydesc :string;public downloadstatus :string;public downloadstatusdesc :string;public status :string;
constructor() {}
}
export interface IdmsdownloadqueueResponse {
total: number;
results: dmsdownloadqueue[];
}

