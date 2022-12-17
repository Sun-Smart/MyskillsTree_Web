export class cmsarticle {
public articleiddesc :string;public articleid :number;public code :string;public title :string;public type :string;public typedesc :string;public keywords :string;public icon :string;public icondesc :string;public summary :string;public details :string;public markpublic :boolean;public author :number;public authordesc :string;public publisheddate :Date;public expirationdate :Date;public language :string;public languagedesc :string;public rating :number;public notes :string;public comments :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IcmsarticleResponse {
total: number;
results: cmsarticle[];
}

