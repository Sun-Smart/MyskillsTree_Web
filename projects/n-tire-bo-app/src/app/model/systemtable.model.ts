export class systemtable {
public tableiddesc :string;public tableid :number;public tablecode :string;public tablename :string;public insertaction :string;public updateaction :string;public deleteaction :string;public workflow :boolean;public remindercolorcode :string;public remindercolorcodedesc :string;public reminderpriority :string;public reminderprioritydesc :string;public remindericon :string;public remindericondesc :string;public documentadminusers :string;public documentsecurity :string;public attachmentcategory :string;public noattachmentdelete :boolean;public audittrailenabled :boolean;public audittrailview :boolean;public audittrailfields :string;public versionmaintenance :boolean;public documentcontrolenabled :boolean;public documentsharingenabled :boolean;public fieldstyles :string;public notifyusersoncreation :string;public notifyusersonupdation :string;public notifyusersondeletion :string;public notifyusersonviewing :string;public recordaccesscondition :string;public recordnoaccesscondition :string;public folderview :string;public metatagfields :string;public digitalsignature :boolean;public viewhtml :string;public templatehtml :string;public helptext :string;public status :string;public DeletedsystemtabletemplateIDs :string;
constructor() {}
}
export interface IsystemtableResponse {
total: number;
results: systemtable[];
}

