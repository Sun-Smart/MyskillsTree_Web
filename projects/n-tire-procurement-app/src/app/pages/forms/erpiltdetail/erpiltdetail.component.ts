import { erpiltdetailService } from './../../../service/erpiltdetail.service';
import { erpiltdetail } from './../../../model/erpiltdetail.model';
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
import { erpiltmaster} from './../../../model/erpiltmaster.model';
import { erpiltmasterComponent } from './../../../pages/forms/erpiltmaster/erpiltmaster.component';
import { erpiltmasterService } from './../../../service/erpiltmaster.service';
//popups
import { bouserbranchaccess} from '../../../../../../n-tire-bo-app/src/app/model/bouserbranchaccess.model';
import { bouserbranchaccessComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bouserbranchaccess/bouserbranchaccess.component';
import { bouserbranchaccessService } from '../../../../../../n-tire-bo-app/src/app/service/bouserbranchaccess.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
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
selector: 'app-erpiltdetail',
templateUrl: './erpiltdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpiltdetailComponent implements OnInit {
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
bfilterPopulateerpiltdetails:boolean=false;
dataerpiltdetailsiltid3:any=[];
dataerpiltdetailsfrombranch3:any=[];
dataerpiltdetailsfrombranchuserid3:any=[];
dataerpiltdetailstobranch3:any=[];
dataerpiltdetailstobranchuserid3:any=[];
dataerpiltdetailsitemid3:any=[];
dataerpiltdetailsuom3:any=[];
 erpiltdetailForm: FormGroup;
iltidList: erpiltmaster[];
iltidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
iltid_erpiltmastersForm: FormGroup;//autocomplete
iltid_erpiltmastersoptions:any;//autocomplete
iltid_erpiltmastersformatter:any;//autocomplete
frombranchList: any[];
frombranchoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
frombranch_bouserbranchaccessesForm: FormGroup;//autocomplete
frombranch_bouserbranchaccessesoptions:any;//autocomplete
frombranch_bouserbranchaccessesformatter:any;//autocomplete
frombranchuseridList: bousermaster[];
frombranchuseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
frombranchuserid_bousermastersForm: FormGroup;//autocomplete
frombranchuserid_bousermastersoptions:any;//autocomplete
frombranchuserid_bousermastersformatter:any;//autocomplete
tobranchList: any[];
tobranchoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tobranch_bouserbranchaccessesForm: FormGroup;//autocomplete
tobranch_bouserbranchaccessesoptions:any;//autocomplete
tobranch_bouserbranchaccessesformatter:any;//autocomplete
tobranchuseridList: bousermaster[];
tobranchuseridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
tobranchuserid_bousermastersForm: FormGroup;//autocomplete
tobranchuserid_bousermastersoptions:any;//autocomplete
tobranchuserid_bousermastersformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
uomList: boconfigvalue[];
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpiltdetailshowOption:boolean;
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
private erpiltdetailservice: erpiltdetailService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpiltmasterservice:erpiltmasterService,
private bouserbranchaccessservice:bouserbranchaccessService,
private bousermasterservice:bousermasterService,
private erpitemmasterservice:erpitemmasterService,
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
this.erpiltdetailForm  = this.fb.group({
pk:[null],
iltid: [null],
iltiddesc: [null],
iltdetailid: [null],
frombranch: [null],
frombranchdesc: [null],
frombranchuserid: [null],
frombranchuseriddesc: [null],
tobranch: [null],
tobranchdesc: [null],
tobranchuserid: [null],
tobranchuseriddesc: [null],
itemid: [null],
itemiddesc: [null],
uom: [null],
uomdesc: [null],
quantity: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpiltdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpiltdetailForm.dirty && this.erpiltdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.iltdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.iltdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.iltdetailid && pkDetail) {
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
let erpiltdetailid = null;

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
this.formid=erpiltdetailid;
//this.sharedService.alert(erpiltdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erpiltmasterservice.geterpiltmastersList().then(res => 
{
this.iltidList = res as erpiltmaster[];
if(this.erpiltdetailservice.formData && this.erpiltdetailservice.formData.iltid){
this.iltidoptionsEvent.emit(this.iltidList);
this.erpiltdetailForm.patchValue({
    iltid: this.erpiltdetailservice.formData.iltid,
    iltiddesc: this.erpiltdetailservice.formData.iltiddesc,
});
}
{
let arriltid = this.iltidList.filter(v => v.iltid == this.erpiltdetailForm.get('iltid').value);
let objiltid;
if (arriltid.length > 0) objiltid = arriltid[0];
if (objiltid)
{
}
}
}
).catch((err) => {console.log(err);});
this.iltid_erpiltmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.iltidList.filter(v => v.ildcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.iltid_erpiltmastersformatter = (result: any) => result.ildcode;
this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res => 
{
this.frombranchList = res as bouserbranchaccess[];
if(this.erpiltdetailservice.formData && this.erpiltdetailservice.formData.frombranch){
this.frombranchoptionsEvent.emit(this.frombranchList);
this.erpiltdetailForm.patchValue({
    frombranch: this.erpiltdetailservice.formData.frombranch,
    frombranchdesc: this.erpiltdetailservice.formData.frombranchdesc,
});
}
{
let arrfrombranch = this.frombranchList.filter(v => v.branchid == this.erpiltdetailForm.get('frombranch').value);
let objfrombranch;
if (arrfrombranch.length > 0) objfrombranch = arrfrombranch[0];
if (objfrombranch)
{
}
}
}
).catch((err) => {console.log(err);});
this.frombranch_bouserbranchaccessesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.frombranchList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.frombranch_bouserbranchaccessesformatter = (result: any) => result.branchname;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.frombranchuseridList = res as bousermaster[];
if(this.erpiltdetailservice.formData && this.erpiltdetailservice.formData.frombranchuserid){
this.frombranchuseridoptionsEvent.emit(this.frombranchuseridList);
this.erpiltdetailForm.patchValue({
    frombranchuserid: this.erpiltdetailservice.formData.frombranchuserid,
    frombranchuseriddesc: this.erpiltdetailservice.formData.frombranchuseriddesc,
});
}
{
let arrfrombranchuserid = this.frombranchuseridList.filter(v => v.userid == this.erpiltdetailForm.get('frombranchuserid').value);
let objfrombranchuserid;
if (arrfrombranchuserid.length > 0) objfrombranchuserid = arrfrombranchuserid[0];
if (objfrombranchuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.frombranchuserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.frombranchuseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.frombranchuserid_bousermastersformatter = (result: any) => result.username;
this.bouserbranchaccessservice.getbouserbranchaccessesList().then(res => 
{
this.tobranchList = res as bouserbranchaccess[];
if(this.erpiltdetailservice.formData && this.erpiltdetailservice.formData.tobranch){
this.tobranchoptionsEvent.emit(this.tobranchList);
this.erpiltdetailForm.patchValue({
    tobranch: this.erpiltdetailservice.formData.tobranch,
    tobranchdesc: this.erpiltdetailservice.formData.tobranchdesc,
});
}
{
let arrtobranch = this.tobranchList.filter(v => v.branchid == this.erpiltdetailForm.get('tobranch').value);
let objtobranch;
if (arrtobranch.length > 0) objtobranch = arrtobranch[0];
if (objtobranch)
{
}
}
}
).catch((err) => {console.log(err);});
this.tobranch_bouserbranchaccessesoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tobranchList.filter(v => v.branchname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tobranch_bouserbranchaccessesformatter = (result: any) => result.branchname;
this.bousermasterservice.getbousermastersList().then(res => 
{
this.tobranchuseridList = res as bousermaster[];
if(this.erpiltdetailservice.formData && this.erpiltdetailservice.formData.tobranchuserid){
this.tobranchuseridoptionsEvent.emit(this.tobranchuseridList);
this.erpiltdetailForm.patchValue({
    tobranchuserid: this.erpiltdetailservice.formData.tobranchuserid,
    tobranchuseriddesc: this.erpiltdetailservice.formData.tobranchuseriddesc,
});
}
{
let arrtobranchuserid = this.tobranchuseridList.filter(v => v.userid == this.erpiltdetailForm.get('tobranchuserid').value);
let objtobranchuserid;
if (arrtobranchuserid.length > 0) objtobranchuserid = arrtobranchuserid[0];
if (objtobranchuserid)
{
}
}
}
).catch((err) => {console.log(err);});
this.tobranchuserid_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.tobranchuseridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.tobranchuserid_bousermastersformatter = (result: any) => result.username;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erpiltdetailservice.formData && this.erpiltdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erpiltdetailForm.patchValue({
    itemid: this.erpiltdetailservice.formData.itemid,
    itemiddesc: this.erpiltdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erpiltdetailForm.get('itemid').value);
let objitemid;
if (arritemid.length > 0) objitemid = arritemid[0];
if (objitemid)
{
}
}
}
).catch((err) => {console.log(err);});
this.itemid_erpitemmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.itemidList.filter(v => v.itemshortname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemshortname;
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);

//autocomplete
    this.erpiltdetailservice.geterpiltdetailsList().then(res => {
      this.pkList = res as erpiltdetail[];
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
this.erpiltdetailForm.markAsUntouched();
this.erpiltdetailForm.markAsPristine();
}
onSelectediltid(iltidDetail: any) {
if (iltidDetail.iltid && iltidDetail) {
this.erpiltdetailForm.patchValue({
iltid: iltidDetail.iltid,
iltiddesc: iltidDetail.ildcode,

});

}
}

onSelectedfrombranch(frombranchDetail: any) {
if (frombranchDetail.branchid && frombranchDetail) {
this.erpiltdetailForm.patchValue({
frombranch: frombranchDetail.branchid,
frombranchdesc: frombranchDetail.branchname,

});

}
}

onSelectedfrombranchuserid(frombranchuseridDetail: any) {
if (frombranchuseridDetail.userid && frombranchuseridDetail) {
this.erpiltdetailForm.patchValue({
frombranchuserid: frombranchuseridDetail.userid,
frombranchuseriddesc: frombranchuseridDetail.username,

});

}
}

onSelectedtobranch(tobranchDetail: any) {
if (tobranchDetail.branchid && tobranchDetail) {
this.erpiltdetailForm.patchValue({
tobranch: tobranchDetail.branchid,
tobranchdesc: tobranchDetail.branchname,

});

}
}

onSelectedtobranchuserid(tobranchuseridDetail: any) {
if (tobranchuseridDetail.userid && tobranchuseridDetail) {
this.erpiltdetailForm.patchValue({
tobranchuserid: tobranchuseridDetail.userid,
tobranchuseriddesc: tobranchuseridDetail.username,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erpiltdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemshortname,

});

}
}




resetForm() {
if (this.erpiltdetailForm != null)
this.erpiltdetailForm.reset();
this.erpiltdetailForm.patchValue({
frombranch: this.sessiondata.branchid,
frombranchdesc: this.sessiondata.branchiddesc,
frombranchuserid: this.sessiondata.userid,
frombranchuseriddesc: this.sessiondata.username,
tobranch: this.sessiondata.branchid,
tobranchdesc: this.sessiondata.branchiddesc,
tobranchuserid: this.sessiondata.userid,
tobranchuseriddesc: this.sessiondata.username,
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let iltdetailid = this.erpiltdetailForm.get('iltdetailid').value;
        if(iltdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpiltdetailservice.deleteerpiltdetail(iltdetailid).then(res =>
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
    this.erpiltdetailForm.patchValue({
        iltdetailid: null
    });
    if(this.erpiltdetailservice.formData.iltdetailid!=null)this.erpiltdetailservice.formData.iltdetailid=null;
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
this.erpiltdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpiltdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpiltdetailForm.controls[key]!=undefined)
{
this.erpiltdetailForm.controls[key].disable({onlySelf: true});
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
if(this.maindata==undefined || this.maindata.save==true  )
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
iltidonChange(evt:any){
let e=evt.value;
}
iltdetailidonChange(evt:any){
let e=evt.value;
}
frombranchonChange(evt:any){
let e=evt.value;
}
frombranchuseridonChange(evt:any){
let e=evt.value;
}
tobranchonChange(evt:any){
let e=evt.value;
}
tobranchuseridonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erpiltdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpiltdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpiltdetailservice.geterpiltdetailsByEID(pkcol).then(res => {

this.erpiltdetailservice.formData=res.erpiltdetail;
let formproperty=res.erpiltdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpiltdetail.pkcol;
this.formid=res.erpiltdetail.iltdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpiltdetail.iltdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpiltdetailForm.patchValue({
iltid: res.erpiltdetail.iltid,
iltiddesc: res.erpiltdetail.iltiddesc,
iltdetailid: res.erpiltdetail.iltdetailid,
frombranch: res.erpiltdetail.frombranch,
frombranchdesc: res.erpiltdetail.frombranchdesc,
frombranchuserid: res.erpiltdetail.frombranchuserid,
frombranchuseriddesc: res.erpiltdetail.frombranchuseriddesc,
tobranch: res.erpiltdetail.tobranch,
tobranchdesc: res.erpiltdetail.tobranchdesc,
tobranchuserid: res.erpiltdetail.tobranchuserid,
tobranchuseriddesc: res.erpiltdetail.tobranchuseriddesc,
itemid: res.erpiltdetail.itemid,
itemiddesc: res.erpiltdetail.itemiddesc,
uom: res.erpiltdetail.uom,
uomdesc: res.erpiltdetail.uomdesc,
quantity: res.erpiltdetail.quantity,
status: res.erpiltdetail.status,
statusdesc: res.erpiltdetail.statusdesc,
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
  for (let key in this.erpiltdetailForm.controls) {
    if (this.erpiltdetailForm.controls[key] != null) {
if(false)
{
if(this.erpiltdetailservice.formData!=null && this.erpiltdetailservice.formData[key]!=null  && this.erpiltdetailservice.formData[key]!='[]' && this.erpiltdetailservice.formData[key]!=undefined && this.erpiltdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpiltdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpiltdetailservice.formData!=null && this.erpiltdetailservice.formData[key]!=null   && this.erpiltdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpiltdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpiltdetailservice.formData!=null && this.erpiltdetailservice.formData[key]!=null   && this.erpiltdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpiltdetailservice.formData[key]+"'><div class='progress__number'>"+this.erpiltdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpiltdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpiltdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpiltdetailForm.value;
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

private erpiltdetailtoggleOption(){
this.erpiltdetailshowOption = this.erpiltdetailshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpiltdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpiltdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpiltdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpiltdetailservice.formData=this.erpiltdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpiltdetailForm.controls[key] != null)
    {
        this.erpiltdetailservice.formData[key] = this.erpiltdetailForm.controls[key].value;
    }
}
}
}
console.log(this.erpiltdetailservice.formData);
this.erpiltdetailservice.formData=this.erpiltdetailForm.value;
this.erpiltdetailservice.saveOrUpdateerpiltdetails().subscribe(
async res => {
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpiltdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpiltdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpiltdetail);
}
else
{
this.FillData(res);
}
}
this.erpiltdetailForm.markAsUntouched();
this.erpiltdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditiltid( iltid) {
/*let ScreenType='2';
this.dialog.open(erpiltmasterComponent, 
{
data: {iltid:this.erpiltdetailForm.get('iltid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfrombranch( branchid) {
/*let ScreenType='2';
this.dialog.open(bouserbranchaccessComponent, 
{
data: {branchid:this.erpiltdetailForm.get('frombranch').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditfrombranchuserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpiltdetailForm.get('frombranchuserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittobranch( branchid) {
/*let ScreenType='2';
this.dialog.open(bouserbranchaccessComponent, 
{
data: {branchid:this.erpiltdetailForm.get('tobranch').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdittobranchuserid( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erpiltdetailForm.get('tobranchuserid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erpiltdetailForm.get('itemid').value, ScreenType:2 }
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



