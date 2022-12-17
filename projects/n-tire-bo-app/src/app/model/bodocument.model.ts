export class bodocument {
public documentiddesc :string;public documentid :number;public sourcefield :string;public sourcereference :number;public referencetype :number;public referenceid :number;public documenttype :string;public documenttypedesc :string;public documentcode :string;public versionnumber :number;public documentname :string;public category :number;public categorydesc :string;public subcategory :number;public subcategorydesc :string;public issuedate :Date;public expirydate :Date;public certified :boolean;public certificatenumber :string;public certifyingagency :string;public renewcompulsary :boolean;public reminder :boolean;public attachment :string;public remarks :string;public status :string;
constructor() {}
}
export interface IbodocumentResponse {
total: number;
results: bodocument[];
}

