import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeeducation } from '../model/hrmsemployeeeducation.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeeducationResponse } from '../model/hrmsemployeeeducation.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeeducationService {
  formData: hrmsemployeeeducation;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeeeducation[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeeeducations(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeeducation', body);
    }
  }

  saveOrUpdatehrmsemployeeeducationsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeeducation', body);
    }
  }

  gethrmsemployeeeducationsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeducation').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeducation' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeeeducationsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeducation' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeeeducationsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeducation' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeeeducation(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeeducation' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeducation')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

