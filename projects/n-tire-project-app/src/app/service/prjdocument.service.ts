import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjdocument } from '../model/prjdocument.model';
import { environment } from '../../environments/environment';
import { IprjdocumentResponse } from '../model/prjdocument.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjdocumentService {
  formData: prjdocument;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjdocument[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjdocuments(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjdocument', body);
    }
  }

  saveOrUpdateprjdocumentsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjdocument', body);
    }
  }

  getprjdocumentsList(): any {
    {
      return this.http.get(this.rootURL + '/prjdocument').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjdocument' + '/param/' + key).toPromise();
    }
  }


  getprjdocumentsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjdocument' + '/e/' + id).toPromise();
    }
  }
  getprjdocumentsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjdocument' + '/' + id).toPromise();
    }
  }

  deleteprjdocument(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjdocument' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjdocument')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

