import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeereward } from '../model/hrmsemployeereward.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeerewardResponse } from '../model/hrmsemployeereward.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeerewardService {
  formData: hrmsemployeereward;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeereward[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeerewards(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeereward', body);
    }
  }

  saveOrUpdatehrmsemployeerewardsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeereward', body);
    }
  }

  gethrmsemployeerewardsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereward').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereward' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeerewardsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereward' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeerewardsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereward' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeereward(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeereward' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereward')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

