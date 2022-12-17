export class dmsfolder {
public folderiddesc :string;public folderid :number;public foldername :string;public parentfolderid :number;public parentfolderiddesc :string;public alloweddocumenttypes :string;public alloweddocumenttypesdesc :string;public restricteddocumenttypes :string;public restricteddocumenttypesdesc :string;public subfoldersallowed :boolean;public type :string;public typedesc :string;public departmentid :number;public departmentiddesc :string;public recordlocation :string;public access :boolean;public allowedusergroups :string;public allowedusergroupsstring :string;public restrictedusergroups :string;public restrictedusergroupsstring :string;public customfieldid :number;public customfieldiddesc :string;public documentfieldscustomid :number;public documentfieldscustomiddesc :string;public maxfilesize :number;public subscriptionallowed :boolean;public subscriptionalert :string;public archivedays :number;public archiveperiod :string;public archiveperioddesc :string;public archivetype :string;public archivetypedesc :string;public canview :boolean;public canedit :boolean;public candownload :boolean;public newalert :string;public viewalert :string;public editalert :string;public downloadalert :string;public folderlevel :number;public createmenu :boolean;public parentmenu :number;public parentmenudesc :string;public fullpath :string;public status :string;public DeleteddmsdownloadqueueIDs :string;public DeleteddmslinkedfolderIDs :string;
constructor() {}
}
export interface IdmsfolderResponse {
total: number;
results: dmsfolder[];
}

