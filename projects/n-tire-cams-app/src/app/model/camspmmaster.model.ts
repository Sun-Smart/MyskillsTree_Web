export class camspmmaster {
public pmiddesc :string;public pmid :number;public assetcategory :string;public assetcategorydesc :string;public reference :string;public description :string;public tat :string;public worktype :string;public worktypedesc :string;public pmtype :string;public pmtypedesc :string;public measurementmeter :string;public measurementmeterdesc :string;public frequencyunit :string;public frequencyunitdesc :string;public frequency :number;public days :string;public pmgenerationtype :string;public pmgenerationtypedesc :string;public remarks :string;public customfield :string;public attachment :string;public status :string;public DeletedcamspmtaskIDs :string;public DeletedcamspminstructionIDs :string;public DeletedcamspmitemIDs :string;public DeletedcamspmsuppliertaskIDs :string;public DeletedcamspmuserIDs :string;
constructor() {}
}
export interface IcamspmmasterResponse {
total: number;
results: camspmmaster[];
}

