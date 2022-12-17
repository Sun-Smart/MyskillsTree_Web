import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodynamicformdetail } from '../model/bodynamicformdetail.model';
import { environment } from '../../environments/environment';
import { IbodynamicformdetailResponse } from '../model/bodynamicformdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodynamicformdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bodynamicformdetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bodynamicformdetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicformdetail' + '/getdefaultdata').toPromise();
    }
  }
  get_bodynamicformdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicformdetail').toPromise();
    }
  }
  getListBy_formdetailid(formdetailid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicformdetail' + '/formdetailid/' + formdetailid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicformdetail' + '/param/' + key).toPromise();
    }
  }


  get_bodynamicformdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicformdetail' + '/e/' + id).toPromise();
    }
  }
  get_bodynamicformdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicformdetail' + '/' + id).toPromise();
    }
  }

  delete_bodynamicformdetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bodynamicformdetail' + '/' + id).toPromise();
    }
  }

  getList_controltype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodynamicformdetail' + '/getList_controltype/').toPromise();
  }


}

