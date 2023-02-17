import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boforum } from '../model/boforum.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboforumResponse } from '../model/boforum.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class boforumService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boforums(formData, attachmentfiles): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.ntireboURL + '/boforum', body).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boforum/getdefaultdata').toPromise();
      return res;
    }
  }
  async get_boforums_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boforum').toPromise();
      return res;
    }
  }
  async getListBy_forumid(forumid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boforum/forumid/' + forumid).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boforum/param/' + key).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boforum/fulllist').toPromise();
      return res;
    }
  }


  async get_boforums_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boforum/e/' + id).toPromise();
      return res;
    }
  }
  async get_boforums_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boforum/' + id).toPromise();
      return res;
    }
  }

  async delete_boforum(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boforum/' + id).toPromise();
      return res;
    }
  }

  getList_forumtype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boforum/getList_forumtype').toPromise();
  }

  getList_forumaccess(): any {
    return this.http.get(AppConstants.ntireboURL + '/boforum/getList_forumaccess').toPromise();
  }

  getList_forumstatus(): any {
    return this.http.get(AppConstants.ntireboURL + '/boforum/getList_forumstatus').toPromise();
  }


}

