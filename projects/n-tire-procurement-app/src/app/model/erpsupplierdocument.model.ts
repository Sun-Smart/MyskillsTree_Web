export class erpsupplierdocument {
public esdiddesc :string;public esdid :number;public supplierid :number;public supplieriddesc :string;public documentid :number;public documentiddesc :string;public issuedate :Date;public expirydate :Date;public renewcompulsary :boolean;public reminder :boolean;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IerpsupplierdocumentResponse {
total: number;
results: erpsupplierdocument[];
}

