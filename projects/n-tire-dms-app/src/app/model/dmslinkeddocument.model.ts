export class dmslinkeddocument {
public linkediddesc :string;public linkedid :number;public documentid :number;public documentiddesc :string;public linkeddocumentid :number;public linkeddocumentiddesc :string;public linktype :string;public linktypedesc :string;public status :string;
constructor() {}
}
export interface IdmslinkeddocumentResponse {
total: number;
results: dmslinkeddocument[];
}

