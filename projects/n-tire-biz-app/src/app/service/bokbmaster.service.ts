import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { bokbmaster } from '../model/bokbmaster.model';
import { bokbtopic } from '../model/bokbtopic.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbokbmasterResponse } from '../model/bokbmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class bokbmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_bokbmasters(formData, attachmentfiles, Deleted_bokbtopic_IDs, bokbtopics): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_bokbtopic_IDs,
        bokbtopics: bokbtopics?.filter(c => c.kbtopicid == null)
      };
      let filearray: any = [];
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.ntireboURL + '/bokbmaster',body).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    debugger;
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster/getdefaultdata').toPromise();
      return res;
    }
  }
  async get_bokbmasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster').toPromise();
      return res;
    }
  }
  async getListBy_kbid(kbid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster/kbid/' + kbid).toPromise();
      return res;
    }
  }

  async getListBy_kbsubcategory(kbsubcategory: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster/kbsubcategory/' + kbsubcategory).toPromise();
      return res;
    }
  }

  async getListBy_kbcategory(kbcategory: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster/kbcategory/' + kbcategory).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster/param/' + key).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster/fulllist').toPromise();
      return res;
    }
  }


  async get_bokbmasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster/e/' + id).toPromise();
      return res;
    }
  }
  async get_bokbmasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbmaster/' + id).toPromise();
      return res;
    }
  }

  async delete_bokbmaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/bokbmaster/' + id).toPromise();
      return res;
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbokbmasterResponse> {
    return this.http.get<IbokbmasterResponse>(AppConstants.ntireboURL + '/bokbmaster')
      .pipe(
        tap((response: IbokbmasterResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bokbmaster => new bokbmaster(bokbmaster.kbid, bokbmaster.kbcode, bokbmaster.kbsubject, bokbmaster.kbcategory, bokbmaster.kbcategorydesc, bokbmaster.kbsubcategory, bokbmaster.kbsubcategorydesc, bokbmaster.tags, bokbmaster.icon, bokbmaster.icondesc, bokbmaster.summary, bokbmaster.kbdetails, bokbmaster.markpublic, bokbmaster.author, bokbmaster.authordesc, bokbmaster.publisheddate, bokbmaster.expirationdate, bokbmaster.language, bokbmaster.languagedesc, bokbmaster.rating, bokbmaster.comments, bokbmaster.kbaccess, bokbmaster.kbaccessdesc, bokbmaster.customfield, bokbmaster.attachment, bokbmaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bokbmaster => bokbmaster.kbsubject.includes(filter.name))

          return response;
        })
      );
  }


  getList_kbcategory(): any {
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster/getList_kbcategory').toPromise();
  }

  getList_kbsubcategory(): any {
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster/getList_kbsubcategory').toPromise();
  }

  getList_icon(): any {
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster/getList_icon').toPromise();
  }

  getList_author(): any {
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster/getList_author').toPromise();
  }

  getList_language(): any {
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster/getList_language').toPromise();
  }

  getList_kbaccess(): any {
    return this.http.get(AppConstants.ntireboURL + '/bokbmaster/getList_kbaccess').toPromise();
  }


}

