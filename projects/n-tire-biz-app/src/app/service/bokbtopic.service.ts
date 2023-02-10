import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { bokbtopic } from '../model/bokbtopic.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbokbtopicResponse } from '../model/bokbtopic.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../../../../n-tire-bo-app/src/app/service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class bokbtopicService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_bokbtopics(formData, contenturl_files): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      filearray.push(contenturl_files);
      let res = await this.http.post(AppConstants.ntireboURL + '/bokbtopic', body).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbtopic/getdefaultdata').toPromise();
      return res;
    }
  }
  async get_bokbtopics_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbtopic').toPromise();
      return res;
    }
  }
  async getListBy_kbtopicid(kbtopicid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbtopic/kbtopicid/' + kbtopicid).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbtopic/param/' + key).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbtopic/fulllist').toPromise();
      return res;
    }
  }


  async get_bokbtopics_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbtopic/e/' + id).toPromise();
      return res;
    }
  }
  async get_bokbtopics_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bokbtopic/' + id).toPromise();
      return res;
    }
  }

  async delete_bokbtopic(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/bokbtopic/' + id).toPromise();
      return res;
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbokbtopicResponse> {
    return this.http.get<IbokbtopicResponse>(AppConstants.ntireboURL + '/bokbtopic')
      .pipe(
        tap((response: IbokbtopicResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bokbtopic => new bokbtopic(bokbtopic.kbtopicid, bokbtopic.kbid, bokbtopic.kbiddesc, bokbtopic.description, bokbtopic.sequence, bokbtopic.contenttype, bokbtopic.contenttypedesc, bokbtopic.contenttext, bokbtopic.contenturl, bokbtopic.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bokbtopic => bokbtopic.description.includes(filter.name))

          return response;
        })
      );
  }


  getList_kbid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bokbtopic/getList_kbid').toPromise();
  }

  getList_contenttype(): any {
    return this.http.get(AppConstants.ntireboURL + '/bokbtopic/getList_contenttype').toPromise();
  }


}

