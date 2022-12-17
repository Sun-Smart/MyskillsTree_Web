import { dmssearchService } from './../../../service/dmssearch.service';
import { dmssearch } from './../../../model/dmssearch.model';
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
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
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
selector: 'app-dmssearch',
templateUrl: './dmssearch.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class dmssearchComponent implements OnInit {
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
bfilterPopulatedmssearches:boolean=false;
datadmssearchesuserid3:any=[];
datadmssearchessearchstatus3:any=[];
 dmssearchForm: FormGroup;
useridList: bousermaster[];
useridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
userid_bousermastersForm: FormGroup;//autocomplete
userid_bousermastersoptions:any;//autocomplete
userid_bousermastersformatter:any;//autocomplete
searchstatusList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
dmssearchshowOption:boolean;
sessiondata:any;
sourcekey:any;






constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private dmssearchservice: dmssearchService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bousermasterservice:bousermasterService,
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
this.dmssearchForm  = this.fb.group({
pk:[null],
searchid: [null],
searchtext: [null],
userid: [null],
useriddesc: [null],
searchstatus: [null],
searchstatusdesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.dmssearchForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.dmssearchForm.dirty && this.dmssearchForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.searchid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.searchid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.searchid && pkDetail) {
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
let dmssearchid = null;

//if view button(eye) is clicked
if ( this.currentRoute.snapshot.paramMap.get('viewid') != null) 
{
this.pkcol=this.currentRoute.snapshot.paramMap.get('viewid');
this.showview=true;
//this.viewhtml=this.sessionService.getViewHtml();
}
else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
  this.pkcol = this.sessionService.getItem('usersource');
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
this.formid=dmssearchid;
//this.sharedService.alert(dmssearchid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.bousermasterservice.getbousermastersList().then(res => 
{
this.useridList = res as bousermaster[];
if(this.dmssearchservice.formData && this.dmssearchservice.formData.userid){
this.useridoptionsEvent.emit(this.useridList);
this.dmssearchForm.patchValue({
    userid: this.dmssearchservice.formData.userid,
    useriddesc: this.dmssearchservice.formData.useriddesc,
});
}
{
let arruserid = this.useridList.filter(v => v.userid == this.dmssearchForm.get('userid').value);
let objuserid;
if (arruserid.length > 0) objuserid = arruserid[0];
if (objuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.userid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.userid_bousermastersformatter = (result: any) => result.username;
this.configservice.getList("searchstatus").then(res => this.searchstatusList = res as boconfigvalue[]);

//autocomplete
    this.dmssearchservice.getdmssearchesList().then(res => {
      this.pkList = res as dmssearch[];
        this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => {console.log(err);});
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

//setting the flag that the screen is not touched 
this.dmssearchForm.markAsUntouched();
this.dmssearchForm.markAsPristine();
}
onSelecteduserid(useridDetail: any) {
if (useridDetail.userid && useridDetail) {
this.dmssearchForm.patchValue({
userid: useridDetail.userid,
useriddesc: useridDetail.username,

});

}
}




resetForm() {
if (this.dmssearchForm != null)
this.dmssearchForm.reset();
this.dmssearchForm.patchValue({
userid: this.sessiondata.userid,
useriddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let searchid = this.dmssearchForm.get('searchid').value;
        if(searchid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.dmssearchservice.deletedmssearch(searchid).then(res =>
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
    this.dmssearchForm.patchValue({
        searchid: null
    });
    if(this.dmssearchservice.formData.searchid!=null)this.dmssearchservice.formData.searchid=null;
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
this.dmssearchForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.dmssearchForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.dmssearchForm.controls[key]!=undefined)
{
this.dmssearchForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
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
if(this.maindata==undefined || this.maindata.pkcol!='' || this.maindata.save==true  )
{
    this.onSubmitData(true);
}
else if( (this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2)))
{
this.onSubmitDataDlg(true);
}
else
{
this.onSubmitData(true);
}
}
searchidonChange(evt:any){
let e=evt.value;
}
searchtextonChange(evt:any){
let e=evt.value;
}
useridonChange(evt:any){
let e=evt.value;
}
searchstatusonChange(evt:any){
let e=this.f.searchstatus.value as any;
this.dmssearchForm.patchValue({searchstatusdesc:evt.options[evt.options.selectedIndex].text});
}
statusonChange(evt:any){
let e=evt.value;
}

editdmssearches() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.dmssearchservice.getdmssearchesByEID(pkcol).then(res => {

this.dmssearchservice.formData=res.dmssearch;
let formproperty=res.dmssearch.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.dmssearch.pkcol;
this.formid=res.dmssearch.searchid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.dmssearchservice.formData=res.dmssearch;
this.formid=res.dmssearch.searchid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.dmssearchForm.patchValue({
searchid: res.dmssearch.searchid,
searchtext: res.dmssearch.searchtext,
userid: res.dmssearch.userid,
useriddesc: res.dmssearch.useriddesc,
searchstatus: res.dmssearch.searchstatus,
searchstatusdesc: res.dmssearch.searchstatusdesc,
status: res.dmssearch.status,
statusdesc: res.dmssearch.statusdesc,
});
//Child Tables if any
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
  for (let key in this.dmssearchForm.controls) {
    if (this.dmssearchForm.controls[key] != null) {
if(false)
{
if(this.dmssearchservice.formData!=null && this.dmssearchservice.formData[key]!=null  && this.dmssearchservice.formData[key]!='[]' && this.dmssearchservice.formData[key]!=undefined && this.dmssearchservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.dmssearchservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.dmssearchservice.formData!=null && this.dmssearchservice.formData[key]!=null   && this.dmssearchservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.dmssearchservice.formData[key]+"></div>");
}
else if(false)
{
if(this.dmssearchservice.formData!=null && this.dmssearchservice.formData[key]!=null   && this.dmssearchservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.dmssearchservice.formData[key]+"'><div class='progress__number'>"+this.dmssearchservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.dmssearchForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.dmssearchForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.dmssearchForm.value;
console.log(obj);
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

private dmssearchtoggleOption(){
this.dmssearchshowOption = this.dmssearchshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.dmssearchForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.dmssearchForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.dmssearchForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.dmssearchservice.formData=this.dmssearchForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.dmssearchForm.controls[key] != null)
    {
        this.dmssearchservice.formData[key] = this.dmssearchForm.controls[key].value;
    }
}
}
}
console.log(this.dmssearchservice.formData);
this.dmssearchservice.formData=this.dmssearchForm.value;
this.dmssearchservice.saveOrUpdatedmssearches().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmssearch);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.dmssearchservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmssearch);
}
else
{
this.FillData(res);
}
}
this.dmssearchForm.markAsUntouched();
this.dmssearchForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEdituserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.dmssearchForm.get('userid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}

}



