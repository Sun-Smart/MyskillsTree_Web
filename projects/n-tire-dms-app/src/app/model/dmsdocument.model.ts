export class dmsdocument {
public documentiddesc :string;public documentid :number;public reference :string;public name :string;public folderid :number;public folderiddesc :string;public sourcefield :string;public sourcereference :number;public versionnumber :number;public versiondate :Date;public departmentid :number;public departmentiddesc :string;public type :string;public typedesc :string;public source :string;public sourcedesc :string;public documentimage :string;public thumbnail :string;public details :string;public origin :string;public receiptdate :Date;public documentlink :string;public size :string;public filetype :string;public filetypedesc :string;public render :boolean;public metatag :string;public checkedout :boolean;public checkoutby :number;public checkoutbydesc :string;public checkoutdatetime :Date;public documentstatus :string;public documentstatusdesc :string;public expirationdate :Date;public rank :number;public fullpath :string;public remarks :string;public customfield :string;public attachment :string;public status :string;public DeletedbodocumentcontrolIDs :string;public DeleteddmssubscriptionIDs :string;public DeleteddmsarchiverestorerequestIDs :string;public DeleteddmsaudittrailIDs :string;public DeleteddmsdocumentfieldIDs :string;public DeleteddmslinkeddocumentIDs :string;public DeleteddmslinkIDs :string;
constructor() {}
}
export interface IdmsdocumentResponse {
total: number;
results: dmsdocument[];
}

