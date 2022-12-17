import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeememo } from '../model/hrmsemployeememo.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeememoResponse } from '../model/hrmsemployeememo.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeememoService {
  formData: hrmsemployeememo;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeememo[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeememos(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeememo', body);
    }
  }

  saveOrUpdatehrmsemployeememosList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeememo', body);
    }
  }

  gethrmsemployeememosList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeememo').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeememo' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeememosByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeememo' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeememosByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeememo' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeememo(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeememo' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeememo')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

