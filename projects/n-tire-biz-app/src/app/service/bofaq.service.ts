import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { bofaq } from '../model/bofaq.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbofaqResponse } from '../model/bofaq.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants,DropDownValues} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../../../../n-tire-bo-app/src/app/service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class bofaqService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient,private sharedService: SharedService,private sessionService: SessionService) { }

valid()
{
return true;

}
  async save_bofaqs(formData):Promise<any> {
  if (this.valid()){
    var body = {
      data:formData
    };
let filearray:any=[];
    let res=await  this.http.post(AppConstants.ntireboURL + '/bofaq',body).toPromise();
return res;
  }
  }

 async  getDefaultData():Promise<any> {
  if (this.valid()){
    let res=await  this.http.get(AppConstants.ntireboURL + '/bofaq/getdefaultdata').toPromise();
return res;
  }
  }
  async  get_bofaqs_List():Promise<any> {
  if (this.valid()){
    let res=await  this.http.get(AppConstants.ntireboURL + '/bofaq').toPromise();
return res;
  }
  }
  async  getListBy_faqid(faqid:number):Promise<any> {
  if (this.valid()){
    let res=await  this.http.get(AppConstants.ntireboURL + '/bofaq/faqid/'+faqid).toPromise();
return res;
  }
  }

  async  getListBy_sourcereference(sourcereference:number):Promise<any> {
  if (this.valid()){
    let res=await  this.http.get(AppConstants.ntireboURL + '/bofaq/sourcereference/'+sourcereference).toPromise();
return res;
  }
  }

 async getList(key:string):Promise<any> {
  if (this.valid()){
    let res=await  this.http.get(AppConstants.ntireboURL + '/bofaq/param/'+key).toPromise();
return res;
  }
  }


 async getFullList():Promise<any> {
  if (this.valid()){
    let res=await  this.http.get(AppConstants.ntireboURL + '/bofaq/fulllist').toPromise();
return res;
  }
  }


 async  get_bofaqs_ByEID(id:any):Promise<any> {
  if (this.valid()){
    let res=await  this.http.get(AppConstants.ntireboURL + '/bofaq/e/'+id).toPromise();
return res;
  }
  }
 async   get_bofaqs_ByID(id:number):Promise<any> {
  if (this.valid()){
    let res=await  this.http.get(AppConstants.ntireboURL + '/bofaq/'+id).toPromise();
return res;
  }
  }

  async  delete_bofaq(id:number):Promise<any> {
  if (this.valid()){
    let res=await  this.http.delete(AppConstants.ntireboURL + '/bofaq/'+id).toPromise();
return res;
  }
  }

    getList_sourcefield():any{
      return this.http.get(AppConstants.ntireboURL + '/bofaq/getList_sourcefield').toPromise();
    }

    getList_categoryid():any{
      return this.http.get(AppConstants.ntireboURL + '/bofaq/getList_categoryid').toPromise();
    }

    getList_subcategoryid(categoryid):any{
      return this.http.get(AppConstants.ntireboURL + '/bofaq/getList_subcategoryid/'+categoryid).toPromise();
    }


}

