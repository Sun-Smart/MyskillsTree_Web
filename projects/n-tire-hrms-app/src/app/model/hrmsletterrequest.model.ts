export class hrmsletterrequest {
public lrequestiddesc :string;public lrequestid :number;public requestdate :Date;public requestreference :string;public lettertype :string;public lettertypedesc :string;public reason :string;public issuedate :Date;public templateid :string;public issuemode :string;public issuemodedesc :string;public attachment :string;public status :string;public statusdesc :string;
constructor() {}
}
export interface IhrmsletterrequestResponse {
total: number;
results: hrmsletterrequest[];
}

