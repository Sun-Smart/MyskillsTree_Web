import { Injectable } from '@angular/core'
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { HttpClient, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { TranslateService } from "@ngx-translate/core";
import { bousermasterService } from './../service/bousermaster.service';
import { bouserrolemasterService } from './../service/bouserrolemaster.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


import { SafePipe } from './../service/safe.pipe';
import * as JSZip from 'jszip';
import { async } from 'rxjs/internal/scheduler/async';

import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicDialog';
import { openfileComponent } from '../custom/openfile.component';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { bomenuactionService } from './../service/bomenuaction.service';
import { SessionService } from './../pages/core/services/session.service';

import { MessageService } from 'primeng/api';


@Injectable()
export class SharedService {
  public menuid: any;
  public menucode: any;
  public currenturl: any;
  readonly rootURL = AppConstants.ntireboURL;
  readonly uploadURL = AppConstants.UploadURL;
  readonly AttachmentURL = "http://localhost:5002/Resources/images1/";
  public tablepaging: any[];
  progress: any;

  cleanURL: any;
  images: any[];
  blob: any;
  doc: any;

  protected get useraccesslistusers(): any { return this.useraccesslistusersval; };
  protected get useraccesslistroles(): any { return this.useraccesslistrolesval; };

  private useraccesslistusersval: any;
  private useraccesslistrolesval: any;

  constructor(private router: Router, private http: HttpClient, public translate: TranslateService, private sanitizer: DomSanitizer,
    private bousermasterservice: bousermasterService,private bomenuactionservice:bomenuactionService,private sessionService: SessionService,
    private bouserrolemasterservice: bouserrolemasterService, private messageService: MessageService,
    private ngbDateParserFormatter: NgbDateParserFormatter,public dialog: DialogService
  ) {
    this.tablepaging = [
      { key: '20', value: '20' },
      { key: '50', value: '50' },
      { key: '100', value: '100' }
    ];
    // this.FillData();
  }
  OpenURL(url, menucode, menuid) {
    debugger;
    if (url != null && url != "") {

      this.menuid = menuid;
      this.menucode = menucode;
      this.currenturl = url;
      this.router.navigate([url]);
    }

  }
  alert(message)
  {
    debugger;
    //alert(message);
    this.messageService.add({severity:'success', summary:message, detail:message});
  }
  async FillData() {
    await this.bousermasterservice.getbousermastersList().then((res: any) => {
      debugger;
      this.useraccesslistusersval = res;
    });
    await this.bouserrolemasterservice.getbouserrolemastersList().then((res: any) => {
      this.useraccesslistrolesval = res;
    });
  }


  public getUser(userid) {
    if (this.useraccesslistusersval == null || this.useraccesslistusersval == undefined) {
      this.FillData();
    }

    return this.useraccesslistusersval.filter(x => x.userid == userid)[0]

  }
  public getRole(roleid) {
    if (this.useraccesslistusersval == null || this.useraccesslistusersval == undefined) {
      this.FillData();
    }

    return this.useraccesslistrolesval.filter(x => x.userroleid == roleid)[0]

  }
  public clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
  public HtmlValue(row, cell) {
    debugger;
    for (const key in row) {
      let val = row[key];
      if (val == 'null' || val == null || val == undefined) val = '';
      if (cell != undefined) {
        if (key == "attachment") {
          debugger;
          cell = cell.replace(new RegExp('##' + key + '##', 'g'), this.getAttachmentValue(val));
        }
        else
          cell = cell.replace(new RegExp('##' + key + '##', 'g'), val);
      }

    }
    var re = /##(\w+)##/g; 
    cell = cell.replace(re, ''); 
    return this.sanitizer.bypassSecurityTrustHtml(cell);
  }

onCustomAction(event:any, modulename)
{
debugger;
let actionid =event.action;
return this.bomenuactionservice.getListByactionid(actionid).then((res:any) => {
    let objbomenuaction=res[0];
    console.log(objbomenuaction);
    var action={ actionid: actionid,actionname:event.action,modulename:'mstapplicantachievementdetails',actiontype:objbomenuaction.actiontype};
    if(objbomenuaction.actiontype=="D")
    {
      return objbomenuaction;
    }
    else
    {
        this.action(null, action,event.data.achievementid ,this.sessionService.getSession().userid,null,null).then((res:any) => {
            debugger;
            console.log(res);
            this.alert((res as any).resultOutput);
            if ((res as any).gotopage != undefined && (res as any).gotopage != null && (res as any).gotopage != "")
            {
                let formname = (res as any).gotopage;
                let recordid = (res as any).gotoid;
                this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + recordid]);
            }
            });
    }

});
}
  action(menuid, action,pk,SessionUser,modulename,dialogdata=null) {
    debugger;
    let v_dialogdata=null;
    if(dialogdata!=null)v_dialogdata=JSON.stringify(dialogdata);
    if(action.modulename!=undefined)modulename=action.modulename;
    let actionids=[];
    actionids.push(pk);
    {
        var body = {
            menuid: "" + menuid,
            actionid: "" + action.actionid,
            ids: actionids,
            formid: 0,
            actionname: action.actionname,
            SessionUser: SessionUser,
            fkname:'',
            fkname1:'',
            fk:0,
            fk1:0,
            modulename:modulename,
            dialogdata:v_dialogdata
        };
        if (action.actiontype == "P") {

            return this.http.post(AppConstants.ntireboURL + '/ReportViewer/runprocedure', body).toPromise();
        }
        else {
            return this.http.post(AppConstants.ntireboURL + '/' + action.servicename + '/' + action.actionname, body).toPromise();
        }
    }
}
  public getAttachmentValue(cell) {

    debugger;
    if(cell!=null && cell!=undefined  && cell!="")
    {
    let cellval = JSON.parse(cell);
    let retval = "";
    try {
      if (cellval != null && cellval != undefined && cellval != "" && cellval != "{}" && cellval != "[]") {
        cellval.forEach(element => {
          retval += element.name + ' ';
        });
      }
    } catch (err) {
      console.log(err)
    }
    return retval;
  }
  }
  public getCustomValue(cell) {
    debugger;
    let cellval = cell
    let retval = "";
    try {
      if (cellval != null && cellval != undefined && cellval != "" && cellval != "{}" && cellval != "[]") {
        cellval.forEach(element => {
          retval += element.name + ' ';
        });
      }
    } catch (err) {
      console.log(err)
    }
    return retval;
  }
  public ParseComment(cell) {
    debugger;
    let ret = "";
    if (cell == null || cell == undefined || cell == "") return "";
    try {
      if (cell != "" && cell != "null" && cell != null && cell != undefined) {
        let comments = JSON.parse(cell);
        for (let comment of comments) {
          //if (ret != "") ret += "\r\n";
          let dt=this.ngbDateParserFormatter.parse(comment.currentDate);// 
          ret +="<p class='nogap'><span class='frontcolor'>" + dt.year +"-" +dt.month + "-" + dt.day + "</span> : " + comment.commentTxt +  "</p>";
          //replyComment
        }
        return ret;
      }

    } catch (err) {
      console.log(err)
    }
    return ret;
  }
  public ParseUserAccess(cell) {
    let ret = this.ParseUserAccessDetails(cell);
    return ret;
  }

  public ParseUserAccessDetails(cell) {

    if (cell == null || cell == undefined || cell == "") return "";
    debugger;
    let ret = "";
    let json1;

    let json;
    console.log(cell);
    try {
      json1 = JSON.parse(cell);
      console.log(json1);
      try {
        json = JSON.parse(json1);
      } catch (e: any) {
        json = json1;
      }
      /* json1=json;
         try {
           json=JSON.parse(json1);
         } catch (e:any) {
             json=json1;
         }*/

      console.log(json);

      let users = json.user;
      let roles = json.role;

      console.log(users);
      console.log(roles);

      if (users != undefined) {
        for (let i = 0; i < users.length; i++) {
          let obj = (this.getUser(users[i]) as any);
          ret += obj.username;
        }
      }

      console.log(ret);

      if (roles != undefined) {
        for (let i = 0; i < roles.length; i++) {
          let obj = (this.getRole(roles[i]) as any);
          ret += obj.userrole;
        }
      }

      console.log(ret);

    } catch (e: any) {
    }
    return ret;
  }

  //
  addMonths(d, val) {
    return d.setMonth(d.getMonth() + val);
  };
  addDays(d, val) {
    return d.setDate(d.getDay() + val);
  };
  /*
  getList(key:string) {
  
      return this.http.get(AppConstants.ntireboURL + '/umssectionmaster'+'/param/'+key).toPromise();
  
    }
  */
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  //
  showAttachment(e, filename) {
    //debugger;
    e.preventDefault();
    window.open('http://localhost:5002/Resources/images1/' + filename, '', 'width=200, height=100');
    return false;
  }



  async geturl(filename: string, filetype: string) {
    debugger;

    this.dialog.open(openfileComponent,
      {
        data: { url: AppConstants.AttachmentURL + filename, ScreenType: 2 },
        header: filename
      }
    );

    return;

    return fetch(AppConstants.AttachmentURL + filename)
      .then((res: any) => res.blob()) // Gets the response and returns it as a blob
      .then(async (blob) => {
        return JSZip.loadAsync(blob).then(function (zip) {
          console.log(zip.files);
          var url;//  = this.createObjectURL(zip.files[0]);
          let file = zip.files;
          Object.keys(zip.files).forEach(async (filename) => {

            return window.URL.createObjectURL(new Blob([zip.file(filename).async('blob') as any], {
              type: filetype
            })
            );



            //.then(async (blob) => {
            console.log(blob);
            console.log("data:" + filetype + ";base64," + blob);
            //return "data:"+filetype+";base64,"+blob;
            var file = new Blob([blob], {
              type: filetype
            });
            url = window.URL.createObjectURL(file);//blob
            return url;
            window.open(url);

            // });  
          });
          //url= window.URL.createObjectURL( file._data );

          //window.open(url);
          // folder1/
          // folder1/folder2/
          // folder1/folder2/folder3/
          // folder1/folder2/folder3/file1.txt
        });

      });

    //return AppConstants.AttachmentURL + filename;
  }

  async upload(files: File[], folderid: any = 0) {
    debugger;
    const formData = new FormData();
    formData.append("folderid", folderid.toString());
    if (files.length > 0) {
      for (let file of files) {
        formData.append(file.name, file);

      }

      //const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
      //headers:headers
      const uploadReq = new HttpRequest('POST', this.uploadURL, formData, {
        reportProgress: true
      });

      this.http.request(uploadReq).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
        }
      });

    }

    //    return this.http.post(this.uploadURL, formData).toPromise();

  }
}