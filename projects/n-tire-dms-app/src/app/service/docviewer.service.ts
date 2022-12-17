import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsfolder } from '../model/dmsfolder.model';
import { dmsdownloadqueue } from '../model/dmsdownloadqueue.model';
import { dmslinkedfolder } from '../model/dmslinkedfolder.model';
import { environment } from '../../environments/environment';
import { IdmsfolderResponse } from '../model/dmsfolder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class docviewerService {
  formData: any;
  readonly rootURL = AppConstants.ntiredmsURL;
 
  list: any[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}

  getdmsfoldersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocviewer').toPromise();
  }
  }
  searchdmsfolders(searchTerm):any {
    if (this.valid()){ 
      var body={
        StartFolder:"",
        SearchTerm:searchTerm,
        Extension:"*.*"
      }
      return this.http.post(AppConstants.ntiredmsURL + '/dmsdocviewer/search',body).toPromise();
    }
    }

}

