export class recrecordmaster {
public recordiddesc :string;public recordid :number;public recorddate :Date;public type :string;public typedesc :string;public referencenumber :string;public description :string;public folderid :number;public folderiddesc :string;public documentreference :string;public documenttitle :string;public documentdate :Date;public language :string;public languagedesc :string;public documenttype :string;public documenttypedesc :string;public documentgroup :string;public documentgroupdesc :string;public metadata :string;public category :number;public categorydesc :string;public subcategory :number;public subcategorydesc :string;public notes :string;public remarks :string;public owner :string;public customfield :string;public attachment :string;public allcomments :string;public comments :string;public status :string;public DeletedreclinkedrecordIDs :string;
constructor() {}
}
export interface IrecrecordmasterResponse {
total: number;
results: recrecordmaster[];
}

