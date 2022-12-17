import { Component, OnInit, Inject,Optional, ViewChild,EventEmitter } from '@angular/core';
import { pmspropertyapplicants } from './../../../model/pmspropertyapplicants.model';
import { NgForm } from '@angular/forms';
import { pmspropertyunit } from './../../../model/pmspropertyunit.model';
import { pmspropertyunitService } from './../../../service/pmspropertyunit.service';
import { pmspropertyapplicantsService } from './../../../service/pmspropertyapplicants.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

//child table
import {SmartTableDatepickerComponent,SmartTableDatepickerRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import {SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-popupselect.component';
import {SmartTableFileRenderComponent} from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';
//Custom control
import { durationComponent } from '../../../../../../n-tire-bo-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput  } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";

import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import {DynamicDialogConfig} from 'primeng/dynamicDialog';
import {DialogService} from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
selector: 'app-pmspropertyapplicants',
templateUrl: './pmspropertyapplicants.component.html',
styles: [],
providers: [ KeyboardShortcutsService,DialogService ]
})
export class pmspropertyapplicantsComponent implements OnInit {
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
isSubmitted:boolean=false;
isValid: boolean = true;
formid: any;
pkcol: any;
 pmspropertyapplicantsForm: FormGroup;

hidelist:any=[];
viewhtml:any='';
showview:boolean=false;
theme:string="";
//formData:any;
shortcuts: ShortcutInput[] = [];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };

showformtype:any;
data:any;
maindata:any;
SESSIONUSERID:any;
sessiondata:any;
pmspropertyunitshowOption:boolean;
sourcekey:any;


constructor(
private nav: Location,
private keyboard: KeyboardShortcutsService,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
private pmspropertyapplicantsservice: pmspropertyapplicantsService,
private pmspropertyunitservice: pmspropertyunitService,
private ngbDateParserFormatter: NgbDateParserFormatter,
private fb: FormBuilder,
private toastr: ToastService,
private dialog: DialogService,
private sharedService: SharedService,
private sessionService: SessionService,
private configservice:boconfigvalueService,

private currentRoute: ActivatedRoute) { 
this.data = dynamicconfig;
this.keyboard.add([
{
        key: 'cmd l',
    command: () => this.dialogRef.close(),
    preventDefault: true
},
{
        key: 'cmd s',
    command: () => this.onSubmitDataDlg(false),
    preventDefault: true
},
{
        key: 'cmd c',
    command: () => this.dialogRef.close(null),
    preventDefault: true
}
]);
this.pmspropertyapplicantsForm  = this.fb.group({
pk:[null],
applicantid: [null],
propertyid: [null],
unitid: [null],
firstname: [null],
lastname: [null],
iscompany: [null],
companyname: [null],
dateofbirth: [null],
identityno: [null],
gender: [null],
email: [null],
phone: [null],
license: [null],
occupants: [null],
preferredmoveindate: [null],
shortbio: [null],
vehicledetails: [null],
petdetails: [null],
currentpropertymoveindate: [null],
currentpropertymoveoutdate: [null],
address: [null],
landlordfirstname: [null],
landlordlastname: [null],
landlordemail: [null],
landlordphone: [null],
employer: [null],
position: [null],
joineddate: [null],
enddate: [null],
workemail: [null],
workphone: [null],
officephone: [null],
officeaddress: [null],
monthlyincome: [null],
supervisorfirstname: [null],
supervisorlastname: [null],
supervisoremail: [null],
supervisorphone: [null],
additionalincome: [null],
ecfirstname: [null],
eclastname: [null],
ecemail: [null],
ecphone: [null],
relationshipdetails: [null],
referencefirstname: [null],
referencelastname: [null],
referenceemail: [null],
referencephone: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.pmspropertyapplicantsForm.controls; }


async ngOnInit() {
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null) {
    this.SESSIONUSERID=this.sessiondata.userid;
}

this.theme=this.sessionService.getItem('selected-theme');
this.viewhtml=this.sessionService.getViewHtml();
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if ( this.data!= null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if(this.data.CustomFormName!=null && this.data.CustomFormName!="")this.CustomFormName=this.data.CustomFormName;
if(this.data.CustomFormField!=null && this.data.CustomFormField!="")this.CustomFormField=this.data.CustomFormField;
if(this.data.CustomFormFieldValue!=null && this.data.CustomFormFieldValue!="")this.CustomFormFieldValue=this.data.CustomFormFieldValue;
let ppk=null;
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
ppk=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if(this.data!=null && this.data.pkcol!=null)
{
this.pkcol=this.data.pkcol;
}
else
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('id');
this.showformtype  = this.currentRoute.snapshot.paramMap.get('showformtype');
}
if(this.data.pkcol!=null && this.data.pkcol!=undefined)ppk=this.data.pkcol;
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
this.formid=ppk;

if (this.pkcol== null)
{
this.pmspropertyapplicantsForm.patchValue({
dateofbirth: this.ngbDateParserFormatter.parse(new Date().toISOString()),
preferredmoveindate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
currentpropertymoveindate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
currentpropertymoveoutdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
joineddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
enddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
});
}
else
{
let obj =  this.pmspropertyunitservice.pmspropertyapplicants.filter(x => (x as any).pkcol == ppk)[0];
this.pmspropertyapplicantsservice.formData = obj;
this.pmspropertyapplicantsForm.patchValue({
applicantid:  obj.applicantid,
propertyid:  obj.propertyid,
unitid:  obj.unitid,
firstname:  obj.firstname,
lastname:  obj.lastname,
iscompany:  obj.iscompany,
companyname:  obj.companyname,
dateofbirth: this.ngbDateParserFormatter.parse(obj.dateofbirth as any),
identityno:  obj.identityno,
gender:  obj.gender,
email:  obj.email,
phone:  obj.phone,
license:  obj.license,
occupants:  obj.occupants,
preferredmoveindate: this.ngbDateParserFormatter.parse(obj.preferredmoveindate as any),
shortbio:  obj.shortbio,
vehicledetails:  obj.vehicledetails,
petdetails:  obj.petdetails,
currentpropertymoveindate: this.ngbDateParserFormatter.parse(obj.currentpropertymoveindate as any),
currentpropertymoveoutdate: this.ngbDateParserFormatter.parse(obj.currentpropertymoveoutdate as any),
address:  obj.address,
landlordfirstname:  obj.landlordfirstname,
landlordlastname:  obj.landlordlastname,
landlordemail:  obj.landlordemail,
landlordphone:  obj.landlordphone,
employer:  obj.employer,
position:  obj.position,
joineddate: this.ngbDateParserFormatter.parse(obj.joineddate as any),
enddate: this.ngbDateParserFormatter.parse(obj.enddate as any),
workemail:  obj.workemail,
workphone:  obj.workphone,
officephone:  obj.officephone,
officeaddress:  obj.officeaddress,
monthlyincome:  obj.monthlyincome,
supervisorfirstname:  obj.supervisorfirstname,
supervisorlastname:  obj.supervisorlastname,
supervisoremail:  obj.supervisoremail,
supervisorphone:  obj.supervisorphone,
additionalincome:  obj.additionalincome,
ecfirstname:  obj.ecfirstname,
eclastname:  obj.eclastname,
ecemail:  obj.ecemail,
ecphone:  obj.ecphone,
relationshipdetails:  obj.relationshipdetails,
referencefirstname:  obj.referencefirstname,
referencelastname:  obj.referencelastname,
referenceemail:  obj.referenceemail,
referencephone:  obj.referencephone,
status:  obj.status,
});



}
}



getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.f) {
    if (this.pmspropertyapplicantsForm.controls[key] != null) {
if(false)
{
if(this.pmspropertyunitsservice.formData[key]!=null && this.pmspropertyunitsservice.formData[key]!=undefined && this.pmspropertyunitsservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.pmspropertyunitsservice.formData[key])[0]["name"]);}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.pmspropertyapplicantsForm.controls[key].value);
    }
  }
  return ret;
}

private pmspropertyapplicantstoggleOption(){
this.pmspropertyapplicantsshowOption = this.pmspropertyunitshowOption === true ? false : true;
}
async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
let strError="";
Object.keys(this.pmspropertyapplicantsForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.pmspropertyapplicantsForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.pmspropertyapplicantsForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.pmspropertyapplicantsForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.pmspropertyapplicantsForm.controls[key] != null)
    {
        obj[key] = this.pmspropertyapplicantsForm.controls[key].value;
    }
}
}
}
obj.dateofbirth=new Date(this.pmspropertyunitForm.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.pmspropertyunitForm.get('dateofbirth').value)+'  UTC' :null);
obj.preferredmoveindate=new Date(this.pmspropertyunitForm.get('preferredmoveindate').value ? this.ngbDateParserFormatter.format(this.pmspropertyunitForm.get('preferredmoveindate').value)+'  UTC' :null);
obj.currentpropertymoveindate=new Date(this.pmspropertyunitForm.get('currentpropertymoveindate').value ? this.ngbDateParserFormatter.format(this.pmspropertyunitForm.get('currentpropertymoveindate').value)+'  UTC' :null);
obj.currentpropertymoveoutdate=new Date(this.pmspropertyunitForm.get('currentpropertymoveoutdate').value ? this.ngbDateParserFormatter.format(this.pmspropertyunitForm.get('currentpropertymoveoutdate').value)+'  UTC' :null);
obj.joineddate=new Date(this.pmspropertyunitForm.get('joineddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyunitForm.get('joineddate').value)+'  UTC' :null);
obj.enddate=new Date(this.pmspropertyunitForm.get('enddate').value ? this.ngbDateParserFormatter.format(this.pmspropertyunitForm.get('enddate').value)+'  UTC' :null);
console.log(obj);
this.dialogRef.close(obj);
setTimeout(() => {
//this.dialogRef.destroy();
},200);
}

    PopulateFromMainScreen(mainscreendata:any,bdisable:any)
    {
    if(mainscreendata!=null)
    {
      for (let key in mainscreendata) {
if(key!='visiblelist' && key!='hidelist' && key!='event'){
        
        let jsonstring="";
        let json=null;
let ctrltype=typeof (mainscreendata[key]);
if(false)
json="";
        else if(key=="dateofbirth")
this.pmspropertyapplicantsForm.patchValue({"dateofbirth":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="preferredmoveindate")
this.pmspropertyapplicantsForm.patchValue({"preferredmoveindate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="currentpropertymoveindate")
this.pmspropertyapplicantsForm.patchValue({"currentpropertymoveindate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="currentpropertymoveoutdate")
this.pmspropertyapplicantsForm.patchValue({"currentpropertymoveoutdate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="joineddate")
this.pmspropertyapplicantsForm.patchValue({"joineddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(key=="enddate")
this.pmspropertyapplicantsForm.patchValue({"enddate":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.pmspropertyapplicantsForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.pmspropertyapplicantsForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.pmspropertyapplicantsForm.controls[key]!=undefined)
{
this.pmspropertyapplicantsForm.controls[key].disable({onlySelf: true});
this.hidelist.push(key);
}
}
      }
      }
      }
    }
    }
onClose() {
this.dialogRef.close();
}

onSubmitAndWait() {
this.onSubmitDataDlg(false);
}
onSubmit() {
this.onSubmitDataDlg(true);
}

editpmspropertyunits() {
this.showview=false;
return false;
}




}


