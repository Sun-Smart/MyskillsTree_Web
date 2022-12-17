import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { systemtabletemplate } from '../model/systemtabletemplate.model';
import { environment } from '../../environments/environment';
import { IsystemtabletemplateResponse } from '../model/systemtabletemplate.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class systemtabletemplateService {
  formData: systemtabletemplate;
  readonly rootURL = AppConstants.ntireboURL;
  list: systemtabletemplate[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatesystemtabletemplates(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntireboURL + '/systemtabletemplate', body);
    }
  }

  saveOrUpdatesystemtabletemplatesList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntireboURL + '/systemtabletemplate', body);
    }
  }

  getsystemtabletemplatesList(): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/systemtabletemplate').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/systemtabletemplate' + '/param/' + key).toPromise();
    }
  }


  getsystemtabletemplatesByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/systemtabletemplate' + '/e/' + id).toPromise();
    }
  }
  getsystemtabletemplatesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/systemtabletemplate' + '/' + id).toPromise();
    }
  }

  deletesystemtabletemplate(id: number): any {
    {
      return this.http.delete(AppConstants.ntireboURL + '/systemtabletemplate' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntireboURL + '/systemtabletemplate')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

