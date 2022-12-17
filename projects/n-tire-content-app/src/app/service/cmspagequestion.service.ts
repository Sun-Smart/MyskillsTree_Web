import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cmspagequestion } from '../model/cmspagequestion.model';
import { environment } from '../../environments/environment';
import { IcmspagequestionResponse } from '../model/cmspagequestion.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class cmspagequestionService {
  formData: cmspagequestion;
  readonly rootURL = AppConstants.ntirecontentURL;
  list: cmspagequestion[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatecmspagequestions() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmspagequestion', body);
    }
  }

  saveOrUpdatecmspagequestionsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmspagequestion', body);
    }
  }

  getcmspagequestionsList() {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspagequestion').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspagequestion' + '/param/' + key).toPromise();
    }
  }

  getcmspagequestionsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspagequestion' + '/' + id).toPromise();
    }
  }

  deletecmspagequestion(id: number) {
    {
      return this.http.delete(AppConstants.ntirecontentURL + '/cmspagequestion' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecontentURL + '/cmspagequestion')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

