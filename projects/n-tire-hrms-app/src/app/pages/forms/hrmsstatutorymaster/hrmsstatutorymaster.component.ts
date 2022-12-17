import { hrmsstatutorymasterService } from './../../../service/hrmsstatutorymaster.service';
import { hrmsstatutorymaster } from './../../../model/hrmsstatutorymaster.model';
import { ElementRef,Component, OnInit,Inject,Optional,ViewChild,EventEmitter  } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair,MustMatch, DateCompare,MustEnable,MustDisable,Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';

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
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { hrmsstatutorydetail } from './../../../model/hrmsstatutorydetail.model';
import { hrmsstatutorydetailComponent } from './../../../pages/forms/hrmsstatutorydetail/hrmsstatutorydetail.component';
//FK services
import { hrmsstatutoryrole } from './../../../model/hrmsstatutoryrole.model';
import { hrmsstatutoryroleComponent } from './../../../pages/forms/hrmsstatutoryrole/hrmsstatutoryrole.component';
//FK services
import { bouserrolemaster,IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { switchMap,map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator,ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import {DialogService} from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
//custom fields & attachments

@Component({
selector: 'app-hrmsstatutorymaster',
templateUrl: './hrmsstatutorymaster.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class hrmsstatutorymasterComponent implements OnInit {
hidelist:any=[];
viewhtml:any='';//stores html view of the screen
showview:boolean=false;//view or edit mode
theme:string="";//current theme
//formdata: any;//current form data
shortcuts: ShortcutInput[] = [];//keyboard keys
showsubmit: boolean = true;//button to show
showGoWorkFlow: boolean = false;
pkList:any;//stores values - used in search, prev, next
pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
pk_tblForm: FormGroup;//pk - autocomplete
pk_tbloptions: any;//pk - autocomplete
pk_tblformatter: any;//pk - autocomplete
toolbarvisible:boolean=true;
customfieldservicelist:any;
CustomFormName:string="";
CustomFormField:string="";
CustomFormFieldValue:string="";
pmenuid:any;
pcurrenturl:any;
isSubmitted:boolean=false;
ShowTableslist:string[]=[];
data:any;
maindata:any;
data3:any=[];
bfilterPopulatehrmsstatutorymasters:boolean=false;
datahrmsstatutorydetailsbasedon3:any=[];
bfilterPopulatehrmsstatutorydetails:boolean=false;
datahrmsstatutoryrolesroleid3:any=[];
bfilterPopulatehrmsstatutoryroles:boolean=false;
@ViewChild('tblhrmsstatutorydetailssource',{static:false}) tblhrmsstatutorydetailssource: Ng2SmartTableComponent;
@ViewChild('tblhrmsstatutoryrolessource',{static:false}) tblhrmsstatutoryrolessource: Ng2SmartTableComponent;
 hrmsstatutorymasterForm: FormGroup;
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
hrmsstatutorymastershowOption:boolean;
hrmsstatutorydetailshowOption:boolean;
hrmsstatutoryroleshowOption:boolean;
sessiondata:any;
sourcekey:any;



hrmsstatutorydetailsvisiblelist:any;
hrmsstatutorydetailshidelist:any;
hrmsstatutoryrolesvisiblelist:any;
hrmsstatutoryroleshidelist:any;

DeletedhrmsstatutorydetailIDs: string="";
hrmsstatutorydetailsID: string = "1";
hrmsstatutorydetailsselectedindex:any;
DeletedhrmsstatutoryroleIDs: string="";
hrmsstatutoryrolesID: string = "2";
hrmsstatutoryrolesselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private hrmsstatutorymasterservice: hrmsstatutorymasterService,
private bouserrolemasterservice: bouserrolemasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private currentRoute: ActivatedRoute) { 
this.translate=this.sharedService.translate;
this.data = dynamicconfig;
this.pmenuid=sharedService.menuid;
this.pcurrenturl=sharedService.currenturl;
this.keyboard.add([
{
        key: 'cmd l',
    command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
    preventDefault: true
},
{
        key: 'cmd s',
    command: () => this.onSubmitData(false),
    preventDefault: true
},
{
        key: 'cmd f',
    command: () => this.resetForm(),
    preventDefault: true
}
]);
this.hrmsstatutorymasterForm  = this.fb.group({
pk:[null],
statutoryid: [null],
statutorycode: [null],
statutoryname: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.hrmsstatutorymasterForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.hrmsstatutorymasterForm.dirty && this.hrmsstatutorymasterForm.touched ) {
if (confirm('Do you want to exit the page?')) {
return Observable.of(true).delay(1000);
} else {
return Observable.of(false);
}
}
return Observable.of(true);
}

//check Unique fields

//navigation buttons
first()
{
  if(this.pkList.length>0) this.PopulateScreen(this.pkList[0].pkcol);
}

last()
{
 if(this.pkList.length>0) this.PopulateScreen(this.pkList[this.pkList.length-1].pkcol);
}

prev()
{
  debugger;
  let pos = this.pkList.map(function(e:any) { return e.statutoryid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.statutoryid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.statutoryid && pkDetail) {
        this.PopulateScreen(pkDetail.pkcol);
    }
  }

// initialize
async ngOnInit() {
//session & theme
this.sessiondata = this.sessionService.getSession();
if (this.sessiondata != null) {
    this.SESSIONUSERID=this.sessiondata.userid;
}

this.theme=this.sessionService.getItem('selected-theme');
this.viewhtml=this.sessionService.getViewHtml();

debugger;
//getting data - from list page, from other screen through dialog
if(this.data!=null && this.data.data!=null)
 {
this.data=this.data.data;
this.maindata = this.data;
}
if(this.maindata!=null && this.maindata.showview!=undefined  && this.maindata.showview!=null)this.showview=this.maindata.showview;
if (this.data != null &&  this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
 if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
    this.sourcekey= this.currentRoute.snapshot.paramMap.get('sourcekey');
}
let hrmsstatutorymasterid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
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
//copy the data from previous dialog 
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
{
this.ShowTableslist=this.currentRoute.snapshot.paramMap.get('tableid').split(',');
}
this.formid=hrmsstatutorymasterid;
//this.sharedService.alert(hrmsstatutorymasterid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SethrmsstatutorydetailsTableConfig();
  setTimeout(() => {
  this.SethrmsstatutorydetailsTableddConfig();
  });

this.SethrmsstatutoryrolesTableConfig();
  setTimeout(() => {
  this.SethrmsstatutoryrolesTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}

//autocomplete
    this.hrmsstatutorymasterservice.gethrmsstatutorymastersList().then(res => {
      this.pkList = res as hrmsstatutorymaster[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.statutoryname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.statutoryname;

//setting the flag that the screen is not touched 
this.hrmsstatutorymasterForm.markAsUntouched();
this.hrmsstatutorymasterForm.markAsPristine();
}



resetForm() {
if (this.hrmsstatutorymasterForm != null)
this.hrmsstatutorymasterForm.reset();
this.hrmsstatutorymasterForm.patchValue({
});
setTimeout(() => {
this.hrmsstatutorymasterservice.hrmsstatutorydetails=[];
this.hrmsstatutorydetailsLoadTable();
this.hrmsstatutorymasterservice.hrmsstatutoryroles=[];
this.hrmsstatutoryrolesLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let statutoryid = this.hrmsstatutorymasterForm.get('statutoryid').value;
        if(statutoryid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.hrmsstatutorymasterservice.deletehrmsstatutorymaster(statutoryid).then(res =>
                {
                this.resetForm();
                }
            ).catch((err) => {console.log(err);});
        }
        }
        else
        {
            this.toastr.addSingle("error","","select a record");
        }
    }
    onCopy(){
    this.hrmsstatutorymasterForm.patchValue({
        statutoryid: null
    });
    if(this.hrmsstatutorymasterservice.formData.statutoryid!=null)this.hrmsstatutorymasterservice.formData.statutoryid=null;
for (let i=0;i<this.hrmsstatutorymasterservice.hrmsstatutorydetails.length;i++) {
this.hrmsstatutorymasterservice.hrmsstatutorydetails[i].detailid=null;
}
for (let i=0;i<this.hrmsstatutorymasterservice.hrmsstatutoryroles.length;i++) {
this.hrmsstatutorymasterservice.hrmsstatutoryroles[i].statutoryroleid=null;
}
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
        else if(ctrltype=="string")
{
this.hrmsstatutorymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.hrmsstatutorymasterForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.hrmsstatutorymasterForm.controls[key]!=undefined)
{
this.hrmsstatutorymasterForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  || this.hrmsstatutorymasterservice.formData.statutoryname!=null )
{
    this.onSubmitData(false);
}
else if(this.maindata!=null  && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.onSubmitDataDlg(false);
}
else
{
this.onSubmitData(false);
}
}
onSubmit() {
if(this.pkcol == null || (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}

edithrmsstatutorymasters() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.hrmsstatutorymasterservice.gethrmsstatutorymastersByEID(pkcol).then(res => {

this.hrmsstatutorymasterservice.formData=res.hrmsstatutorymaster;
let formproperty=res.hrmsstatutorymaster.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.hrmsstatutorymaster.pkcol;
this.formid=res.hrmsstatutorymaster.statutoryid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.hrmsstatutorymaster.statutoryid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.hrmsstatutorymasterForm.patchValue({
statutoryid: res.hrmsstatutorymaster.statutoryid,
statutorycode: res.hrmsstatutorymaster.statutorycode,
statutoryname: res.hrmsstatutorymaster.statutoryname,
status: res.hrmsstatutorymaster.status,
statusdesc: res.hrmsstatutorymaster.statusdesc,
});
this.hrmsstatutorydetailsvisiblelist=res.hrmsstatutorydetailsvisiblelist;
this.hrmsstatutoryrolesvisiblelist=res.hrmsstatutoryrolesvisiblelist;
//Child Tables if any
this.hrmsstatutorymasterservice.hrmsstatutorydetails = res.hrmsstatutorydetails;
this.SethrmsstatutorydetailsTableConfig();
this.hrmsstatutorydetailsLoadTable();
  setTimeout(() => {
  this.SethrmsstatutorydetailsTableddConfig();
  });
this.hrmsstatutorymasterservice.hrmsstatutoryroles = res.hrmsstatutoryroles;
this.SethrmsstatutoryrolesTableConfig();
this.hrmsstatutoryrolesLoadTable();
  setTimeout(() => {
  this.SethrmsstatutoryrolesTableddConfig();
  });
}

validate()
{
let ret=true;
return ret;
}

getHtml(html:any)
{
  let ret = "";
  ret = html;
  for (let key in this.hrmsstatutorymasterForm.controls) {
    if (this.hrmsstatutorymasterForm.controls[key] != null) {
if(false)
{
if(this.hrmsstatutorymasterservice.formData!=null && this.hrmsstatutorymasterservice.formData[key]!=null  && this.hrmsstatutorymasterservice.formData[key]!='[]' && this.hrmsstatutorymasterservice.formData[key]!=undefined && this.hrmsstatutorymasterservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.hrmsstatutorymasterservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.hrmsstatutorymasterservice.formData!=null && this.hrmsstatutorymasterservice.formData[key]!=null   && this.hrmsstatutorymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.hrmsstatutorymasterservice.formData[key]+"></div>");
}
else if(false)
{
if(this.hrmsstatutorymasterservice.formData!=null && this.hrmsstatutorymasterservice.formData[key]!=null   && this.hrmsstatutorymasterservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.hrmsstatutorymasterservice.formData[key]+"'><div class='progress__number'>"+this.hrmsstatutorymasterservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hrmsstatutorymasterForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.hrmsstatutorymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.hrmsstatutorymasterForm.value;
console.log(obj);
if (!confirm('Do you want to want to save?')) {
return;
}
this.dialogRef.close(obj);
setTimeout(() => {
//this.dialogRef.destroy();
},200);
}

//This has to come from bomenuactions & procedures
afteraction(mode:any)
{
    let formname="";
    let query="";
    if(mode=="new")
        this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if(mode=="refresh")
        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
}

private hrmsstatutorymastertoggleOption(){
this.hrmsstatutorymastershowOption = this.hrmsstatutorymastershowOption === true ? false : true;
}

private hrmsstatutorydetailtoggleOption(){
this.hrmsstatutorydetailshowOption = this.hrmsstatutorydetailshowOption === true ? false : true;
}

private hrmsstatutoryroletoggleOption(){
this.hrmsstatutoryroleshowOption = this.hrmsstatutoryroleshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.hrmsstatutorymasterForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.hrmsstatutorymasterForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.hrmsstatutorymasterForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.hrmsstatutorymasterservice.formData=this.hrmsstatutorymasterForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.hrmsstatutorymasterForm.controls[key] != null)
    {
        this.hrmsstatutorymasterservice.formData[key] = this.hrmsstatutorymasterForm.controls[key].value;
    }
}
}
}
this.hrmsstatutorymasterservice.formData.DeletedhrmsstatutorydetailIDs = this.DeletedhrmsstatutorydetailIDs;
this.hrmsstatutorymasterservice.formData.DeletedhrmsstatutoryroleIDs = this.DeletedhrmsstatutoryroleIDs;
console.log(this.hrmsstatutorymasterservice.formData);
this.hrmsstatutorymasterservice.formData=this.hrmsstatutorymasterForm.value;
this.hrmsstatutorymasterservice.saveOrUpdatehrmsstatutorymasters().subscribe(
async res => {
if (this.hrmsstatutorydetailssource.data)
{
    for (let i = 0; i < this.hrmsstatutorydetailssource.data.length; i++)
    {
        if (this.hrmsstatutorydetailssource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsstatutorydetailssource.data[i].fileattachmentlist);
    }
}
if (this.hrmsstatutoryrolessource.data)
{
    for (let i = 0; i < this.hrmsstatutoryrolessource.data.length; i++)
    {
        if (this.hrmsstatutoryrolessource.data[i].fileattachmentlist)await this.sharedService.upload(this.hrmsstatutoryrolessource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsstatutorymaster);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.hrmsstatutorymasterservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).hrmsstatutorymaster);
}
else
{
this.FillData(res);
}
}
this.hrmsstatutorymasterForm.markAsUntouched();
this.hrmsstatutorymasterForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdithrmsstatutorydetail(event:any,detailid:any, statutoryid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsstatutorydetailComponent, 
{
data:  {  showview:false,save:false,event,detailid, statutoryid,visiblelist:this.hrmsstatutorydetailsvisiblelist,  hidelist:this.hrmsstatutorydetailshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsstatutorydetailssource.add(res);
this.hrmsstatutorydetailssource.refresh();
}
else
{
this.hrmsstatutorydetailssource.update(event.data, res);
}
}
});
}

onDeletehrmsstatutorydetail(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsstatutorydetailIDs += childID + ",";
this.hrmsstatutorymasterservice.hrmsstatutorydetails.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEdithrmsstatutoryrole(event:any,statutoryroleid:any, statutoryid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(hrmsstatutoryroleComponent, 
{
data:  {  showview:false,save:false,event,statutoryroleid, statutoryid,visiblelist:this.hrmsstatutoryrolesvisiblelist,  hidelist:this.hrmsstatutoryroleshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.hrmsstatutoryrolessource.add(res);
this.hrmsstatutoryrolessource.refresh();
}
else
{
this.hrmsstatutoryrolessource.update(event.data, res);
}
}
});
}

onDeletehrmsstatutoryrole(event:any,childID: number, i: number) {
if (childID != null)
this.DeletedhrmsstatutoryroleIDs += childID + ",";
this.hrmsstatutorymasterservice.hrmsstatutoryroles.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes hrmsstatutorydetails
hrmsstatutorydetailssettings:any;
hrmsstatutorydetailssource: any;

showhrmsstatutorydetailsCheckbox()
{
debugger;
if(this.tblhrmsstatutorydetailssource.settings['selectMode']== 'multi')this.tblhrmsstatutorydetailssource.settings['selectMode']= 'single';
else
this.tblhrmsstatutorydetailssource.settings['selectMode']= 'multi';
this.tblhrmsstatutorydetailssource.initGrid();
}
deletehrmsstatutorydetailsAll()
{
this.tblhrmsstatutorydetailssource.settings['selectMode'] = 'single';
}
showhrmsstatutorydetailsFilter()
{
  setTimeout(() => {
  this.SethrmsstatutorydetailsTableddConfig();
  });
      if(this.tblhrmsstatutorydetailssource.settings!=null)this.tblhrmsstatutorydetailssource.settings['hideSubHeader'] =!this.tblhrmsstatutorydetailssource.settings['hideSubHeader'];
this.tblhrmsstatutorydetailssource.initGrid();
}
showhrmsstatutorydetailsInActive()
{
}
enablehrmsstatutorydetailsInActive()
{
}
async SethrmsstatutorydetailsTableddConfig()
{
if(!this.bfilterPopulatehrmsstatutorydetails){

this.configservice.getList("statutorycriteria").then(res=>
{
var databasedon2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsstatutorydetailsbasedon3.push(defaultobj);
for(let i=0; i<databasedon2.length; i++){
var obj= { value: databasedon2[i].configkey, title: databasedon2[i].configtext};
this.datahrmsstatutorydetailsbasedon3.push(obj);
}
var clone = this.sharedService.clone(this.tblhrmsstatutorydetailssource.settings);
if(clone.columns['basedon']!=undefined)clone.columns['basedon'].filter=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsstatutorydetailsbasedon3)), }, };
if(clone.columns['basedon']!=undefined)clone.columns['basedon'].editor=    { type: 'list', config: {  selectText: 'Select...',list: JSON.parse(JSON.stringify(this.datahrmsstatutorydetailsbasedon3)), }, };
this.tblhrmsstatutorydetailssource.settings =  clone;
this.tblhrmsstatutorydetailssource.initGrid();
});
}
this.bfilterPopulatehrmsstatutorydetails=true;
}
async hrmsstatutorydetailsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsstatutorydetailsTableConfig()
{
this.hrmsstatutorydetailssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
basedon: {
title: 'Based On',
type: '',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsstatutorydetailsbasedon3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
fromamount: {
title: 'From Amount',
type: 'number',
filter:true,
},
toamount: {
title: 'To Amount',
type: 'number',
filter:true,
},
percentageemployer: {
title: 'Percentage Employer',
type: 'number',
filter:true,
},
percentageemployee: {
title: 'Percentage Employee',
type: 'number',
filter:true,
},
maxemployerpercentage: {
title: 'Max Employer Percentage',
type: 'number',
filter:true,
},
maxemployeepercentage: {
title: 'Max Employee Percentage',
type: 'number',
filter:true,
},
},
};
}
hrmsstatutorydetailsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsstatutorydetailsID)>=0)
{
this.hrmsstatutorydetailssource=new LocalDataSource();
this.hrmsstatutorydetailssource.load(this.hrmsstatutorymasterservice.hrmsstatutorydetails as  any as LocalDataSource);
this.hrmsstatutorydetailssource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsstatutorydetailsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsstatutorymasterservice.hrmsstatutorydetails.length == 0)
{
    this.tblhrmsstatutorydetailssource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsstatutorydetail();
    this.hrmsstatutorymasterservice.hrmsstatutorydetails.push(obj);
    this.hrmsstatutorydetailssource.refresh();
    if ((this.hrmsstatutorymasterservice.hrmsstatutorydetails.length / this.hrmsstatutorydetailssource.getPaging().perPage).toFixed(0) + 1 != this.hrmsstatutorydetailssource.getPaging().page)
    {
        this.hrmsstatutorydetailssource.setPage((this.hrmsstatutorymasterservice.hrmsstatutorydetails.length / this.hrmsstatutorydetailssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsstatutorydetailssource.grid.edit(this.tblhrmsstatutorydetailssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsstatutorydetailssource.data.indexOf(event.data);
this.onDeletehrmsstatutorydetail(event,event.data.detailid,((this.hrmsstatutorydetailssource.getPaging().page-1) *this.hrmsstatutorydetailssource.getPaging().perPage)+index);
this.hrmsstatutorydetailssource.refresh();
break;
}
}

*/
hrmsstatutorydetailsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsstatutorydetail(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsstatutorydetail(event,event.data.detailid,this.formid);
break;
case 'delete':
this.onDeletehrmsstatutorydetail(event,event.data.detailid,((this.hrmsstatutorydetailssource.getPaging().page-1) *this.hrmsstatutorydetailssource.getPaging().perPage)+event.index);
this.hrmsstatutorydetailssource.refresh();
break;
}
}
hrmsstatutorydetailsonDelete(obj) {
let detailid=obj.data.detailid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsstatutorymasterservice.deletehrmsstatutorymaster(detailid).then(res=>
this.hrmsstatutorydetailsLoadTable()
);
}
}
hrmsstatutorydetailsPaging(val)
{
debugger;
this.hrmsstatutorydetailssource.setPaging(1, val, true);
}

handlehrmsstatutorydetailsGridSelected(event:any) {
this.hrmsstatutorydetailsselectedindex=this.hrmsstatutorymasterservice.hrmsstatutorydetails.findIndex(i => i.detailid === event.data.detailid);
}
IshrmsstatutorydetailsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsstatutorydetailsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsstatutorydetails
//start of Grid Codes hrmsstatutoryroles
hrmsstatutoryrolessettings:any;
hrmsstatutoryrolessource: any;

showhrmsstatutoryrolesCheckbox()
{
debugger;
if(this.tblhrmsstatutoryrolessource.settings['selectMode']== 'multi')this.tblhrmsstatutoryrolessource.settings['selectMode']= 'single';
else
this.tblhrmsstatutoryrolessource.settings['selectMode']= 'multi';
this.tblhrmsstatutoryrolessource.initGrid();
}
deletehrmsstatutoryrolesAll()
{
this.tblhrmsstatutoryrolessource.settings['selectMode'] = 'single';
}
showhrmsstatutoryrolesFilter()
{
  setTimeout(() => {
  this.SethrmsstatutoryrolesTableddConfig();
  });
      if(this.tblhrmsstatutoryrolessource.settings!=null)this.tblhrmsstatutoryrolessource.settings['hideSubHeader'] =!this.tblhrmsstatutoryrolessource.settings['hideSubHeader'];
this.tblhrmsstatutoryrolessource.initGrid();
}
showhrmsstatutoryrolesInActive()
{
}
enablehrmsstatutoryrolesInActive()
{
}
async SethrmsstatutoryrolesTableddConfig()
{
if(!this.bfilterPopulatehrmsstatutoryroles){

this.bouserrolemasterservice.getbouserrolemastersList().then(res=>
{
var dataroleid2=res as any;
var defaultobj= { value:"", title:"Select..."};
this.datahrmsstatutoryrolesroleid3.push(defaultobj);
for(let i=0; i<dataroleid2.length; i++){
var obj= { value: dataroleid2[i].userroleid, title:dataroleid2[i].userrole};
this.datahrmsstatutoryrolesroleid3.push(obj);
}
if((this.tblhrmsstatutoryrolessource.settings as any).columns['roleid'])
{
(this.tblhrmsstatutoryrolessource.settings as any).columns['roleid'].editor.config.list=JSON.parse(JSON.stringify(this.datahrmsstatutoryrolesroleid3));
this.tblhrmsstatutoryrolessource.initGrid();
}
});
}
this.bfilterPopulatehrmsstatutoryroles=true;
}
async hrmsstatutoryrolesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SethrmsstatutoryrolesTableConfig()
{
this.hrmsstatutoryrolessettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'single',
actions: {
columnTitle:'',
width:'300px',
add: !this.showview,
edit: true, // true,
delete:!this.showview,
custom: [
// { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
// { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
]
},
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmCreate:true,},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {
roleid: {
title: 'Role',
type: 'number',
filter:{ type: 'list',config: {selectText: 'Select...',list:[]},},
editor:{ type: 'list',config: {selectText: 'Select...',list:[]},},
valuePrepareFunction: (cell,row) => {
var element= this.datahrmsstatutoryrolesroleid3.find(c=>c.value==cell);
if(element!=null && element!=undefined){
return element.title;
}
return cell;
}, 
},
},
};
}
hrmsstatutoryrolesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsstatutoryrolesID)>=0)
{
this.hrmsstatutoryrolessource=new LocalDataSource();
this.hrmsstatutoryrolessource.load(this.hrmsstatutorymasterservice.hrmsstatutoryroles as  any as LocalDataSource);
this.hrmsstatutoryrolessource.setPaging(1, 20, true);
}
}

//external to inline
/*
hrmsstatutoryrolesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.hrmsstatutorymasterservice.hrmsstatutoryroles.length == 0)
{
    this.tblhrmsstatutoryrolessource.grid.createFormShown = true;
}
else
{
    let obj = new hrmsstatutoryrole();
    this.hrmsstatutorymasterservice.hrmsstatutoryroles.push(obj);
    this.hrmsstatutoryrolessource.refresh();
    if ((this.hrmsstatutorymasterservice.hrmsstatutoryroles.length / this.hrmsstatutoryrolessource.getPaging().perPage).toFixed(0) + 1 != this.hrmsstatutoryrolessource.getPaging().page)
    {
        this.hrmsstatutoryrolessource.setPage((this.hrmsstatutorymasterservice.hrmsstatutoryroles.length / this.hrmsstatutoryrolessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblhrmsstatutoryrolessource.grid.edit(this.tblhrmsstatutoryrolessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.hrmsstatutoryrolessource.data.indexOf(event.data);
this.onDeletehrmsstatutoryrole(event,event.data.statutoryroleid,((this.hrmsstatutoryrolessource.getPaging().page-1) *this.hrmsstatutoryrolessource.getPaging().perPage)+index);
this.hrmsstatutoryrolessource.refresh();
break;
}
}

*/
hrmsstatutoryrolesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEdithrmsstatutoryrole(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEdithrmsstatutoryrole(event,event.data.statutoryroleid,this.formid);
break;
case 'delete':
this.onDeletehrmsstatutoryrole(event,event.data.statutoryroleid,((this.hrmsstatutoryrolessource.getPaging().page-1) *this.hrmsstatutoryrolessource.getPaging().perPage)+event.index);
this.hrmsstatutoryrolessource.refresh();
break;
}
}
hrmsstatutoryrolesonDelete(obj) {
let statutoryroleid=obj.data.statutoryroleid;
if (confirm('Are you sure to delete this record ?')) {
this.hrmsstatutorymasterservice.deletehrmsstatutorymaster(statutoryroleid).then(res=>
this.hrmsstatutoryrolesLoadTable()
);
}
}
hrmsstatutoryrolesPaging(val)
{
debugger;
this.hrmsstatutoryrolessource.setPaging(1, val, true);
}

handlehrmsstatutoryrolesGridSelected(event:any) {
this.hrmsstatutoryrolesselectedindex=this.hrmsstatutorymasterservice.hrmsstatutoryroles.findIndex(i => i.statutoryroleid === event.data.statutoryroleid);
}
IshrmsstatutoryrolesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.hrmsstatutoryrolesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes hrmsstatutoryroles

}



