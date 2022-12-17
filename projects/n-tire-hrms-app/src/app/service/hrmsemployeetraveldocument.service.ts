import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeetraveldocument } from '../model/hrmsemployeetraveldocument.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeetraveldocumentResponse } from '../model/hrmsemployeetraveldocument.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeetraveldocumentService {
  formData: hrmsemployeetraveldocument;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeetraveldocument[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeetraveldocuments(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetraveldocument', body);
    }
  }

  saveOrUpdatehrmsemployeetraveldocumentsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetraveldocument', body);
    }
  }

  gethrmsemployeetraveldocumentsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraveldocument').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraveldocument' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeetraveldocumentsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraveldocument' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeetraveldocumentsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraveldocument' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeetraveldocument(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeetraveldocument' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraveldocument')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

