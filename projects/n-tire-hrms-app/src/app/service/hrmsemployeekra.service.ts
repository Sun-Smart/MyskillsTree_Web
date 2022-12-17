import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeekra } from '../model/hrmsemployeekra.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeekraResponse } from '../model/hrmsemployeekra.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeekraService {
  formData: hrmsemployeekra;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeekra[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeekras(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeekra', body);
    }
  }

  saveOrUpdatehrmsemployeekrasList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeekra', body);
    }
  }

  gethrmsemployeekrasList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekra').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekra' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeekrasByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekra' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeekrasByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekra' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeekra(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeekra' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekra')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

