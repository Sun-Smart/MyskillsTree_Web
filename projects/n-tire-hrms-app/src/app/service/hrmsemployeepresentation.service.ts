import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeepresentation } from '../model/hrmsemployeepresentation.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeepresentationResponse } from '../model/hrmsemployeepresentation.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeepresentationService {
  formData: hrmsemployeepresentation;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeepresentation[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeepresentations(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeepresentation', body);
    }
  }

  saveOrUpdatehrmsemployeepresentationsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeepresentation', body);
    }
  }

  gethrmsemployeepresentationsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepresentation').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepresentation' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeepresentationsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepresentation' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeepresentationsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepresentation' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeepresentation(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeepresentation' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepresentation')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

