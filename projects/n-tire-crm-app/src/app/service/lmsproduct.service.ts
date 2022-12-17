import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsproduct } from '../model/lmsproduct.model';
import { lmspending } from '../model/lmspending.model';
import { lmsreminder } from '../model/lmsreminder.model';
import { lmssecondarycontact } from '../model/lmssecondarycontact.model';
import { environment } from '../../environments/environment';
import { IlmsproductResponse } from '../model/lmsproduct.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsproductService {
  formData: lmsproduct;
  readonly rootURL = AppConstants.ntirecrmURL;
  lmspendings: lmspending[] = [];
  lmsreminders: lmsreminder[] = [];
  lmssecondarycontacts: lmssecondarycontact[] = [];
  list: lmsproduct[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatelmsproducts() {
    {
      var body = {
        ...this.formData,
        lmspendings: this.lmspendings.filter(function (el) { return Object.keys(el).length != 0; }),
        lmsreminders: this.lmsreminders.filter(function (el) { return Object.keys(el).length != 0; }),
        lmssecondarycontacts: this.lmssecondarycontacts.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirecrmURL + '/lmsproduct', body);
    }
  }

  saveOrUpdatelmsproductsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecrmURL + '/lmsproduct', body);
    }
  }

  getlmsproductsList() {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmsproduct').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmsproduct' + '/param/' + key).toPromise();
    }
  }

  getlmsproductsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmsproduct' + '/' + id).toPromise();
    }
  }

  deletelmsproduct(id: number) {
    {
      return this.http.delete(AppConstants.ntirecrmURL + '/lmsproduct' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.lmspendings = [];
    this.lmsreminders = [];
    this.lmssecondarycontacts = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecrmURL + '/lmsproduct')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

