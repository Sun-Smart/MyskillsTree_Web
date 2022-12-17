export class dmsconfig {
public configiddesc :string;public configid :number;public name :string;public parentid :number;public type :string;public typedesc :string;public departmentid :number;public departmentiddesc :string;public customfieldid :number;public customfieldiddesc :string;public folderid :number;public folderiddesc :string;public maxfilesize :number;public subscriptionallowed :boolean;public subscriptionalert :string;public recordlocation :string;public archivedays :number;public archiveperiod :string;public archiveperioddesc :string;public archivetype :string;public archivetypedesc :string;public canview :boolean;public canedit :boolean;public candownload :boolean;public newalert :string;public viewalert :string;public editalert :string;public downloadalert :string;public status :string;
constructor() {}
}
export interface IdmsconfigResponse {
total: number;
results: dmsconfig[];
}

