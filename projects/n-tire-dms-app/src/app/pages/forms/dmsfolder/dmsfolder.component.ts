import { dmsfolderService } from './../../../service/dmsfolder.service';
import { dmsfolder } from './../../../model/dmsfolder.model';
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
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { bousergroup} from '../../../../../../n-tire-bo-app/src/app/model/bousergroup.model';
import { bousergroupComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousergroup/bousergroup.component';
import { bousergroupService } from '../../../../../../n-tire-bo-app/src/app/service/bousergroup.service';
//popups
import { bodynamicform} from '../../../../../../n-tire-bo-app/src/app/model/bodynamicform.model';
import { bodynamicformComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bodynamicform/bodynamicform.component';
import { bodynamicformService } from '../../../../../../n-tire-bo-app/src/app/service/bodynamicform.service';
//popups
import { bomenumaster} from '../../../../../../n-tire-bo-app/src/app/model/bomenumaster.model';
import { bomenumasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomenumaster/bomenumaster.component';
import { bomenumasterService } from '../../../../../../n-tire-bo-app/src/app/service/bomenumaster.service';
//popups
//detail table services
import { dmsdownloadqueue } from './../../../model/dmsdownloadqueue.model';
import { dmsdownloadqueueComponent } from './../../../pages/forms/dmsdownloadqueue/dmsdownloadqueue.component';
//FK services
import { bousermaster,IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { dmslinkedfolder } from './../../../model/dmslinkedfolder.model';
import { dmslinkedfolderComponent } from './../../../pages/forms/dmslinkedfolder/dmslinkedfolder.component';
//FK services
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
selector: 'app-dmsfolder',
templateUrl: './dmsfolder.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class dmsfolderComponent implements OnInit {
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
bfilterPopulatedmsfolders:boolean=false;
datadmsfoldersparentfolderid3:any=[];
datadmsfoldersalloweddocumenttypes3:any=[];
datadmsfoldersrestricteddocumenttypes3:any=[];
datadmsfolderstype3:any=[];
datadmsfoldersdepartmentid3:any=[];
datadmsfoldersallowedusergroups3:any=[];
datadmsfoldersrestrictedusergroups3:any=[];
datadmsfolderscustomfieldid3:any=[];
datadmsfoldersdocumentfieldscustomid3:any=[];
datadmsfoldersarchiveperiod3:any=[];
datadmsfoldersarchivetype3:any=[];
datadmsfoldersparentmenu3:any=[];
datadmsdownloadqueuesdownloadstatus3:any=[];
datadmsdownloadqueuesfolderid3:any=[];
datadmsdownloadqueuesrequestedby3:any=[];
bfilterPopulatedmsdownloadqueues:boolean=false;
datadmslinkedfolderslinktype3:any=[];
datadmslinkedfolderslinkedfolderid3:any=[];
datadmslinkedfoldersfolderid3:any=[];
bfilterPopulatedmslinkedfolders:boolean=false;
@ViewChild('tbldmsdownloadqueuessource',{static:false}) tbldmsdownloadqueuessource: Ng2SmartTableComponent;
@ViewChild('tbldmslinkedfolderssource',{static:false}) tbldmslinkedfolderssource: Ng2SmartTableComponent;
 dmsfolderForm: FormGroup;
parentfolderidList: dmsfolder[];
alloweddocumenttypesList: boconfigvalue[];
restricteddocumenttypesList: boconfigvalue[];
typeList: boconfigvalue[];
departmentidList: bomasterdata[];
allowedusergroupsList: any[];
restrictedusergroupsList: any[];
customfieldidList: bodynamicform[];
documentfieldscustomidList: bodynamicform[];
archiveperiodList: boconfigvalue[];
archivetypeList: boconfigvalue[];
parentmenuList: bomenumaster[];
parentmenuoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
parentmenu_bomenumastersForm: FormGroup;//autocomplete
parentmenu_bomenumastersoptions:any;//autocomplete
parentmenu_bomenumastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
dmsfoldershowOption:boolean;
dmsdownloadqueueshowOption:boolean;
dmslinkedfoldershowOption:boolean;
sessiondata:any;
sourcekey:any;



dmsdownloadqueuesvisiblelist:any;
dmsdownloadqueueshidelist:any;
dmslinkedfoldersvisiblelist:any;
dmslinkedfoldershidelist:any;

DeleteddmsdownloadqueueIDs: string="";
dmsdownloadqueuesID: string = "1";
dmsdownloadqueuesselectedindex:any;
DeleteddmslinkedfolderIDs: string="";
dmslinkedfoldersID: string = "2";
dmslinkedfoldersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private dmsfolderservice: dmsfolderService,
private bousermasterservice: bousermasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private bomasterdataservice:bomasterdataService,
private bousergroupservice:bousergroupService,
private bodynamicformservice:bodynamicformService,
private bomenumasterservice:bomenumasterService,
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
this.dmsfolderForm  = this.fb.group({
pk:[null],
folderid: [null],
foldername: [null, Validators.required],
parentfolderid: [null, Validators.required],
parentfolderiddesc: [null],
alloweddocumenttypes: [null],
alloweddocumenttypesdesc: [null],
restricteddocumenttypes: [null],
restricteddocumenttypesdesc: [null],
subfoldersallowed: [null],
type: [null],
typedesc: [null],
departmentid: [null],
departmentiddesc: [null],
recordlocation: [null],
access: [null],
allowedusergroups: [null],
restrictedusergroups: [null],
customfieldid: [null],
customfieldiddesc: [null],
documentfieldscustomid: [null],
documentfieldscustomiddesc: [null],
maxfilesize: [null],
subscriptionallowed: [null],
subscriptionalert: [null],
archivedays: [null],
archiveperiod: [null],
archiveperioddesc: [null],
archivetype: [null],
archivetypedesc: [null],
canview: [null],
canedit: [null],
candownload: [null],
newalert: [null],
viewalert: [null],
editalert: [null],
downloadalert: [null],
folderlevel: [null],
createmenu: [null],
parentmenu: [null],
parentmenudesc: [null],
fullpath: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.dmsfolderForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.dmsfolderForm.dirty && this.dmsfolderForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.folderid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.folderid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.folderid && pkDetail) {
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
let dmsfolderid = null;

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
this.formid=dmsfolderid;
//this.sharedService.alert(dmsfolderid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SetdmsdownloadqueuesTableConfig();
  setTimeout(() => {
  this.SetdmsdownloadqueuesTableddConfig();
  });

this.SetdmslinkedfoldersTableConfig();
  setTimeout(() => {
  this.SetdmslinkedfoldersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.dmsfolderservice.getdmsfoldersList().then(res => 
{
this.parentfolderidList = res as dmsfolder[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("documenttype").then(res => this.alloweddocumenttypesList = res as boconfigvalue[]);
this.configservice.getList("documenttype").then(res => this.restricteddocumenttypesList = res as boconfigvalue[]);
this.configservice.getList("documenttype").then(res => this.typeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("qghhe").then(res => {
this.departmentidList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.bousergroupservice.getbousergroupsList().then(res => 
{
this.allowedusergroupsList = (res as bousergroup[]).map((item) =>{return {label:item.groupname,value:item.usergroupid}});
}
).catch((err) => {console.log(err);});
this.bousergroupservice.getbousergroupsList().then(res => 
{
this.restrictedusergroupsList = (res as bousergroup[]).map((item) =>{return {label:item.groupname,value:item.usergroupid}});
}
).catch((err) => {console.log(err);});
this.bodynamicformservice.getbodynamicformsList().then(res => 
{
this.customfieldidList = res as bodynamicform[];
}
).catch((err) => {console.log(err);});
this.bodynamicformservice.getbodynamicformsList().then(res => 
{
this.documentfieldscustomidList = res as bodynamicform[];
}
).catch((err) => {console.log(err);});
this.configservice.getList("frequency").then(res => this.archiveperiodList = res as boconfigvalue[]);
this.configservice.getList("archivetype").then(res => this.archivetypeList = res as boconfigvalue[]);
this.bomenumasterservice.getbomenumastersList().then(res => 
{
this.parentmenuList = res as bomenumaster[];
if(this.dmsfolderservice.formData && this.dmsfolderservice.formData.parentmenu){
this.parentmenuoptionsEvent.emit(this.parentmenuList);
this.dmsfolderForm.patchValue({
    parentmenu: this.dmsfolderservice.formData.parentmenu,
    parentmenudesc: this.dmsfolderservice.formData.parentmenudesc,
});
}
{
let arrparentmenu = this.parentmenuList.filter(v => v.menuid == this.dmsfolderForm.get('parentmenu').value);
let objparentmenu;
if (arrparentmenu.length > 0) objparentmenu = arrparentmenu[0];
if (objparentmenu)
{
}
}
}
).catch((err) => {console.log(err);});
this.parentmenu_bomenumastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.parentmenuList.filter(v => v.menudescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.parentmenu_bomenumastersformatter = (result: any) => result.menudescription;

//autocomplete
    this.dmsfolderservice.getdmsfoldersList().then(res => {
      this.pkList = res as dmsfolder[];
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
this.dmsfolderForm.markAsUntouched();
this.dmsfolderForm.markAsPristine();
}
onSelectedparentmenu(parentmenuDetail: any) {
if (parentmenuDetail.menuid && parentmenuDetail) {
this.dmsfolderForm.patchValue({
parentmenu: parentmenuDetail.menuid,
parentmenudesc: parentmenuDetail.menudescription,

});

}
}




resetForm() {
if (this.dmsfolderForm != null)
this.dmsfolderForm.reset();
this.dmsfolderForm.patchValue({
});
setTimeout(() => {
this.dmsfolderservice.dmsdownloadqueues=[];
this.dmsdownloadqueuesLoadTable();
this.dmsfolderservice.dmslinkedfolders=[];
this.dmslinkedfoldersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let folderid = this.dmsfolderForm.get('folderid').value;
        if(folderid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.dmsfolderservice.deletedmsfolder(folderid).then(res =>
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
    this.dmsfolderForm.patchValue({
        folderid: null
    });
    if(this.dmsfolderservice.formData.folderid!=null)this.dmsfolderservice.formData.folderid=null;
for (let i=0;i<this.dmsfolderservice.dmsdownloadqueues.length;i++) {
this.dmsfolderservice.dmsdownloadqueues[i].queueid=null;
}
for (let i=0;i<this.dmsfolderservice.dmslinkedfolders.length;i++) {
this.dmsfolderservice.dmslinkedfolders[i].linkedid=null;
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
        else if(key=="newalert")
this.dmsfolderForm.patchValue({"newalert":  mainscreendata[key] } );
        else if(key=="viewalert")
this.dmsfolderForm.patchValue({"viewalert":  mainscreendata[key] } );
        else if(key=="editalert")
this.dmsfolderForm.patchValue({"editalert":  mainscreendata[key] } );
        else if(key=="downloadalert")
this.dmsfolderForm.patchValue({"downloadalert":  mainscreendata[key] } );
        else if(ctrltype=="string")
{
this.dmsfolderForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.dmsfolderForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.dmsfolderForm.controls[key]!=undefined)
{
this.dmsfolderForm.controls[key].disable({onlySelf: true});
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
folderidonChange(evt:any){
let e=evt.value;
}
foldernameonChange(evt:any){
let e=evt.value;
}
parentfolderidonChange(evt:any){
let e=evt.value;
this.dmsfolderForm.patchValue({parentfolderiddesc:evt.options[evt.options.selectedIndex].text});
}
alloweddocumenttypesonChange(evt:any){
let e=this.f.alloweddocumenttypes.value as any;
this.dmsfolderForm.patchValue({alloweddocumenttypesdesc:evt.options[evt.options.selectedIndex].text});
}
restricteddocumenttypesonChange(evt:any){
let e=this.f.restricteddocumenttypes.value as any;
this.dmsfolderForm.patchValue({restricteddocumenttypesdesc:evt.options[evt.options.selectedIndex].text});
}
subfoldersallowedonChange(evt:any){
let e=evt.value;
}
typeonChange(evt:any){
let e=this.f.type.value as any;
this.dmsfolderForm.patchValue({typedesc:evt.options[evt.options.selectedIndex].text});
}
departmentidonChange(evt:any){
let e=evt.value;
this.dmsfolderForm.patchValue({departmentiddesc:evt.options[evt.options.selectedIndex].text});
}
recordlocationonChange(evt:any){
let e=evt.value;
}
accessonChange(evt:any){
let e=evt.value;
}
allowedusergroupsonChange(evt:any){
let e=evt.value;
this.dmsfolderForm.patchValue({allowedusergroupsdesc:evt.options[evt.options.selectedIndex].text});
}
restrictedusergroupsonChange(evt:any){
let e=evt.value;
this.dmsfolderForm.patchValue({restrictedusergroupsdesc:evt.options[evt.options.selectedIndex].text});
}
customfieldidonChange(evt:any){
let e=evt.value;
this.dmsfolderForm.patchValue({customfieldiddesc:evt.options[evt.options.selectedIndex].text});
}
documentfieldscustomidonChange(evt:any){
let e=evt.value;
this.dmsfolderForm.patchValue({documentfieldscustomiddesc:evt.options[evt.options.selectedIndex].text});
}
maxfilesizeonChange(evt:any){
let e=evt.value;
}
subscriptionallowedonChange(evt:any){
let e=evt.value;
}
subscriptionalertonChange(evt:any){
let e=evt.value;
}
archivedaysonChange(evt:any){
let e=evt.value;
}
archiveperiodonChange(evt:any){
let e=this.f.archiveperiod.value as any;
this.dmsfolderForm.patchValue({archiveperioddesc:evt.options[evt.options.selectedIndex].text});
}
archivetypeonChange(evt:any){
let e=this.f.archivetype.value as any;
this.dmsfolderForm.patchValue({archivetypedesc:evt.options[evt.options.selectedIndex].text});
}
canviewonChange(evt:any){
let e=evt.value;
}
caneditonChange(evt:any){
let e=evt.value;
}
candownloadonChange(evt:any){
let e=evt.value;
}
newalertonChange(evt:any){
let e=evt.value;
}
viewalertonChange(evt:any){
let e=evt.value;
}
editalertonChange(evt:any){
let e=evt.value;
}
downloadalertonChange(evt:any){
let e=evt.value;
}
folderlevelonChange(evt:any){
let e=evt.value;
}
createmenuonChange(evt:any){
let e=evt.value;
}
parentmenuonChange(evt:any){
let e=evt.value;
}
fullpathonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editdmsfolders() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.dmsfolderservice.getdmsfoldersByEID(pkcol).then(res => {

this.dmsfolderservice.formData=res.dmsfolder;
let formproperty=res.dmsfolder.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.dmsfolder.pkcol;
this.formid=res.dmsfolder.folderid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.dmsfolderservice.formData=res.dmsfolder;
this.formid=res.dmsfolder.folderid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.dmsfolderForm.patchValue({
folderid: res.dmsfolder.folderid,
foldername: res.dmsfolder.foldername,
parentfolderid: res.dmsfolder.parentfolderid,
parentfolderiddesc: res.dmsfolder.parentfolderiddesc,
alloweddocumenttypes: res.dmsfolder.alloweddocumenttypes,
alloweddocumenttypesdesc: res.dmsfolder.alloweddocumenttypesdesc,
restricteddocumenttypes: res.dmsfolder.restricteddocumenttypes,
restricteddocumenttypesdesc: res.dmsfolder.restricteddocumenttypesdesc,
subfoldersallowed: res.dmsfolder.subfoldersallowed,
type: res.dmsfolder.type,
typedesc: res.dmsfolder.typedesc,
departmentid: res.dmsfolder.departmentid,
departmentiddesc: res.dmsfolder.departmentiddesc,
recordlocation: res.dmsfolder.recordlocation,
access: res.dmsfolder.access,
allowedusergroups: res.dmsfolder.allowedusergroups,
restrictedusergroups: res.dmsfolder.restrictedusergroups,
customfieldid: res.dmsfolder.customfieldid,
customfieldiddesc: res.dmsfolder.customfieldiddesc,
documentfieldscustomid: res.dmsfolder.documentfieldscustomid,
documentfieldscustomiddesc: res.dmsfolder.documentfieldscustomiddesc,
maxfilesize: res.dmsfolder.maxfilesize,
subscriptionallowed: res.dmsfolder.subscriptionallowed,
subscriptionalert: res.dmsfolder.subscriptionalert,
archivedays: res.dmsfolder.archivedays,
archiveperiod: res.dmsfolder.archiveperiod,
archiveperioddesc: res.dmsfolder.archiveperioddesc,
archivetype: res.dmsfolder.archivetype,
archivetypedesc: res.dmsfolder.archivetypedesc,
canview: res.dmsfolder.canview,
canedit: res.dmsfolder.canedit,
candownload: res.dmsfolder.candownload,
newalert: JSON.parse(res.dmsfolder.newalert),
viewalert: JSON.parse(res.dmsfolder.viewalert),
editalert: JSON.parse(res.dmsfolder.editalert),
downloadalert: JSON.parse(res.dmsfolder.downloadalert),
folderlevel: res.dmsfolder.folderlevel,
createmenu: res.dmsfolder.createmenu,
parentmenu: res.dmsfolder.parentmenu,
parentmenudesc: res.dmsfolder.parentmenudesc,
fullpath: res.dmsfolder.fullpath,
status: res.dmsfolder.status,
statusdesc: res.dmsfolder.statusdesc,
});
this.dmsdownloadqueuesvisiblelist=res.dmsdownloadqueuesvisiblelist;
this.dmslinkedfoldersvisiblelist=res.dmslinkedfoldersvisiblelist;
//Child Tables if any
this.dmsfolderservice.dmsdownloadqueues = res.dmsdownloadqueues;
this.SetdmsdownloadqueuesTableConfig();
this.dmsdownloadqueuesLoadTable();
  setTimeout(() => {
  this.SetdmsdownloadqueuesTableddConfig();
  });
this.dmsfolderservice.dmslinkedfolders = res.dmslinkedfolders;
this.SetdmslinkedfoldersTableConfig();
this.dmslinkedfoldersLoadTable();
  setTimeout(() => {
  this.SetdmslinkedfoldersTableddConfig();
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
  for (let key in this.dmsfolderForm.controls) {
    if (this.dmsfolderForm.controls[key] != null) {
if(false)
{
if(this.dmsfolderservice.formData!=null && this.dmsfolderservice.formData[key]!=null  && this.dmsfolderservice.formData[key]!='[]' && this.dmsfolderservice.formData[key]!=undefined && this.dmsfolderservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.dmsfolderservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.dmsfolderservice.formData!=null && this.dmsfolderservice.formData[key]!=null   && this.dmsfolderservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.dmsfolderservice.formData[key]+"></div>");
}
else if(false)
{
if(this.dmsfolderservice.formData!=null && this.dmsfolderservice.formData[key]!=null   && this.dmsfolderservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.dmsfolderservice.formData[key]+"'><div class='progress__number'>"+this.dmsfolderservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.dmsfolderForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.dmsfolderForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.dmsfolderForm.value;
obj.allowedusergroups=null;
if(this.dmsfolderForm.get('allowedusergroups').value!=null)obj.allowedusergroupsstring=JSON.stringify(this.dmsfolderForm.get('allowedusergroups').value);
obj.restrictedusergroups=null;
if(this.dmsfolderForm.get('restrictedusergroups').value!=null)obj.restrictedusergroupsstring=JSON.stringify(this.dmsfolderForm.get('restrictedusergroups').value);
if(this.dmsfolderForm.get('newalert').value!=null)obj.newalert=JSON.stringify(this.dmsfolderForm.get('newalert').value);
if(this.dmsfolderForm.get('viewalert').value!=null)obj.viewalert=JSON.stringify(this.dmsfolderForm.get('viewalert').value);
if(this.dmsfolderForm.get('editalert').value!=null)obj.editalert=JSON.stringify(this.dmsfolderForm.get('editalert').value);
if(this.dmsfolderForm.get('downloadalert').value!=null)obj.downloadalert=JSON.stringify(this.dmsfolderForm.get('downloadalert').value);
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

private dmsfoldertoggleOption(){
this.dmsfoldershowOption = this.dmsfoldershowOption === true ? false : true;
}

private dmsdownloadqueuetoggleOption(){
this.dmsdownloadqueueshowOption = this.dmsdownloadqueueshowOption === true ? false : true;
}

private dmslinkedfoldertoggleOption(){
this.dmslinkedfoldershowOption = this.dmslinkedfoldershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.dmsfolderForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.dmsfolderForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.dmsfolderForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.dmsfolderservice.formData=this.dmsfolderForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.dmsfolderForm.controls[key] != null)
    {
        this.dmsfolderservice.formData[key] = this.dmsfolderForm.controls[key].value;
    }
}
}
}
this.dmsfolderservice.formData.allowedusergroups=null;
if(this.dmsfolderForm.get('allowedusergroups').value!=null)this.dmsfolderservice.formData.allowedusergroupsstring=JSON.stringify(this.dmsfolderForm.get('allowedusergroups').value);
this.dmsfolderservice.formData.restrictedusergroups=null;
if(this.dmsfolderForm.get('restrictedusergroups').value!=null)this.dmsfolderservice.formData.restrictedusergroupsstring=JSON.stringify(this.dmsfolderForm.get('restrictedusergroups').value);
if(this.dmsfolderForm.get('newalert').value!=null)this.dmsfolderservice.formData.newalert=JSON.stringify(this.dmsfolderForm.get('newalert').value);
if(this.dmsfolderForm.get('viewalert').value!=null)this.dmsfolderservice.formData.viewalert=JSON.stringify(this.dmsfolderForm.get('viewalert').value);
if(this.dmsfolderForm.get('editalert').value!=null)this.dmsfolderservice.formData.editalert=JSON.stringify(this.dmsfolderForm.get('editalert').value);
if(this.dmsfolderForm.get('downloadalert').value!=null)this.dmsfolderservice.formData.downloadalert=JSON.stringify(this.dmsfolderForm.get('downloadalert').value);
this.dmsfolderservice.formData.DeleteddmsdownloadqueueIDs = this.DeleteddmsdownloadqueueIDs;
this.dmsfolderservice.formData.DeleteddmslinkedfolderIDs = this.DeleteddmslinkedfolderIDs;
console.log(this.dmsfolderservice.formData);
this.dmsfolderservice.formData=this.dmsfolderForm.value;
this.dmsfolderservice.saveOrUpdatedmsfolders().subscribe(
async res => {
if (this.dmsdownloadqueuessource.data)
{
    for (let i = 0; i < this.dmsdownloadqueuessource.data.length; i++)
    {
        if (this.dmsdownloadqueuessource.data[i].fileattachmentlist)await this.sharedService.upload(this.dmsdownloadqueuessource.data[i].fileattachmentlist);
    }
}
if (this.dmslinkedfolderssource.data)
{
    for (let i = 0; i < this.dmslinkedfolderssource.data.length; i++)
    {
        if (this.dmslinkedfolderssource.data[i].fileattachmentlist)await this.sharedService.upload(this.dmslinkedfolderssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsfolder);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.dmsfolderservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).dmsfolder);
}
else
{
this.FillData(res);
}
}
this.dmsfolderForm.markAsUntouched();
this.dmsfolderForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditparentfolderid( folderid) {
/*let ScreenType='2';
this.dialog.open(dmsfolderComponent, 
{
data: {folderid:this.dmsfolderForm.get('parentfolderid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdepartmentid( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.dmsfolderForm.get('departmentid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditallowedusergroups( usergroupid) {
/*let ScreenType='2';
this.dialog.open(bousergroupComponent, 
{
data: {usergroupid:this.dmsfolderForm.get('allowedusergroups').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrestrictedusergroups( usergroupid) {
/*let ScreenType='2';
this.dialog.open(bousergroupComponent, 
{
data: {usergroupid:this.dmsfolderForm.get('restrictedusergroups').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditcustomfieldid( formid) {
/*let ScreenType='2';
this.dialog.open(bodynamicformComponent, 
{
data: {formid:this.dmsfolderForm.get('customfieldid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdocumentfieldscustomid( tableid) {
/*let ScreenType='2';
this.dialog.open(bodynamicformComponent, 
{
data: {tableid:this.dmsfolderForm.get('documentfieldscustomid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditparentmenu( menuid) {
/*let ScreenType='2';
this.dialog.open(bomenumasterComponent, 
{
data: {menuid:this.dmsfolderForm.get('parentmenu').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditdmsdownloadqueue(event:any,queueid:any, folderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(dmsdownloadqueueComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,queueid, folderid,visiblelist:this.dmsdownloadqueuesvisiblelist,  hidelist:this.dmsdownloadqueueshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.dmsdownloadqueuessource.add(res);
this.dmsdownloadqueuessource.refresh();
}
else
{
this.dmsdownloadqueuessource.update(event.data, res);
}
}
});
}

onDeletedmsdownloadqueue(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteddmsdownloadqueueIDs += childID + ",";
this.dmsfolderservice.dmsdownloadqueues.splice(i, 1);
//this.updateGrandTotal();
}

AddOrEditdmslinkedfolder(event:any,linkedid:any, folderid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(dmslinkedfolderComponent, 
{
data:  {  showview:false,save:false,pkcol:this.pkcol,event,linkedid, folderid,visiblelist:this.dmslinkedfoldersvisiblelist,  hidelist:this.dmslinkedfoldershidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.dmslinkedfolderssource.add(res);
this.dmslinkedfolderssource.refresh();
}
else
{
this.dmslinkedfolderssource.update(event.data, res);
}
}
});
}

onDeletedmslinkedfolder(event:any,childID: number, i: number) {
if (childID != null)
this.DeleteddmslinkedfolderIDs += childID + ",";
this.dmsfolderservice.dmslinkedfolders.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes dmsdownloadqueues
dmsdownloadqueuessettings:any;
dmsdownloadqueuessource: any;

showdmsdownloadqueuesCheckbox()
{
debugger;
if(this.tbldmsdownloadqueuessource.settings['selectMode']== 'multi')this.tbldmsdownloadqueuessource.settings['selectMode']= 'single';
else
this.tbldmsdownloadqueuessource.settings['selectMode']= 'multi';
this.tbldmsdownloadqueuessource.initGrid();
}
deletedmsdownloadqueuesAll()
{
this.tbldmsdownloadqueuessource.settings['selectMode'] = 'single';
}
showdmsdownloadqueuesFilter()
{
  setTimeout(() => {
  this.SetdmsdownloadqueuesTableddConfig();
  });
      if(this.tbldmsdownloadqueuessource.settings!=null)this.tbldmsdownloadqueuessource.settings['hideSubHeader'] =!this.tbldmsdownloadqueuessource.settings['hideSubHeader'];
this.tbldmsdownloadqueuessource.initGrid();
}
showdmsdownloadqueuesInActive()
{
}
enabledmsdownloadqueuesInActive()
{
}
async SetdmsdownloadqueuesTableddConfig()
{
if(!this.bfilterPopulatedmsdownloadqueues){
}
this.bfilterPopulatedmsdownloadqueues=true;
}
async dmsdownloadqueuesbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetdmsdownloadqueuesTableConfig()
{
this.dmsdownloadqueuessettings = {
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
requestedby: {
title: 'Requested By',
type: 'number',
filter:true,
},
downloadstatus: {
title: 'Download Status',
type: '',
filter:true,
},
},
};
}
dmsdownloadqueuesLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmsdownloadqueuesID)>=0)
{
this.dmsdownloadqueuessource=new LocalDataSource();
this.dmsdownloadqueuessource.load(this.dmsfolderservice.dmsdownloadqueues as  any as LocalDataSource);
this.dmsdownloadqueuessource.setPaging(1, 20, true);
}
}

//external to inline
/*
dmsdownloadqueuesroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsfolderservice.dmsdownloadqueues.length == 0)
{
    this.tbldmsdownloadqueuessource.grid.createFormShown = true;
}
else
{
    let obj = new dmsdownloadqueue();
    this.dmsfolderservice.dmsdownloadqueues.push(obj);
    this.dmsdownloadqueuessource.refresh();
    if ((this.dmsfolderservice.dmsdownloadqueues.length / this.dmsdownloadqueuessource.getPaging().perPage).toFixed(0) + 1 != this.dmsdownloadqueuessource.getPaging().page)
    {
        this.dmsdownloadqueuessource.setPage((this.dmsfolderservice.dmsdownloadqueues.length / this.dmsdownloadqueuessource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbldmsdownloadqueuessource.grid.edit(this.tbldmsdownloadqueuessource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.dmsdownloadqueuessource.data.indexOf(event.data);
this.onDeletedmsdownloadqueue(event,event.data.queueid,((this.dmsdownloadqueuessource.getPaging().page-1) *this.dmsdownloadqueuessource.getPaging().perPage)+index);
this.dmsdownloadqueuessource.refresh();
break;
}
}

*/
dmsdownloadqueuesroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditdmsdownloadqueue(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditdmsdownloadqueue(event,event.data.queueid,this.formid);
break;
case 'delete':
this.onDeletedmsdownloadqueue(event,event.data.queueid,((this.dmsdownloadqueuessource.getPaging().page-1) *this.dmsdownloadqueuessource.getPaging().perPage)+event.index);
this.dmsdownloadqueuessource.refresh();
break;
}
}
dmsdownloadqueuesonDelete(obj) {
let queueid=obj.data.queueid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsfolderservice.deletedmsfolder(queueid).then(res=>
this.dmsdownloadqueuesLoadTable()
);
}
}
dmsdownloadqueuesPaging(val)
{
debugger;
this.dmsdownloadqueuessource.setPaging(1, val, true);
}

handledmsdownloadqueuesGridSelected(event:any) {
this.dmsdownloadqueuesselectedindex=this.dmsfolderservice.dmsdownloadqueues.findIndex(i => i.queueid === event.data.queueid);
}
IsdmsdownloadqueuesVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmsdownloadqueuesID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes dmsdownloadqueues
//start of Grid Codes dmslinkedfolders
dmslinkedfolderssettings:any;
dmslinkedfolderssource: any;

showdmslinkedfoldersCheckbox()
{
debugger;
if(this.tbldmslinkedfolderssource.settings['selectMode']== 'multi')this.tbldmslinkedfolderssource.settings['selectMode']= 'single';
else
this.tbldmslinkedfolderssource.settings['selectMode']= 'multi';
this.tbldmslinkedfolderssource.initGrid();
}
deletedmslinkedfoldersAll()
{
this.tbldmslinkedfolderssource.settings['selectMode'] = 'single';
}
showdmslinkedfoldersFilter()
{
  setTimeout(() => {
  this.SetdmslinkedfoldersTableddConfig();
  });
      if(this.tbldmslinkedfolderssource.settings!=null)this.tbldmslinkedfolderssource.settings['hideSubHeader'] =!this.tbldmslinkedfolderssource.settings['hideSubHeader'];
this.tbldmslinkedfolderssource.initGrid();
}
showdmslinkedfoldersInActive()
{
}
enabledmslinkedfoldersInActive()
{
}
async SetdmslinkedfoldersTableddConfig()
{
if(!this.bfilterPopulatedmslinkedfolders){
}
this.bfilterPopulatedmslinkedfolders=true;
}
async dmslinkedfoldersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SetdmslinkedfoldersTableConfig()
{
this.dmslinkedfolderssettings = {
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
linkedfolderid: {
title: 'Linked Folder',
type: 'number',
filter:true,
},
linktype: {
title: 'Link Type',
type: '',
filter:true,
},
},
};
}
dmslinkedfoldersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmslinkedfoldersID)>=0)
{
this.dmslinkedfolderssource=new LocalDataSource();
this.dmslinkedfolderssource.load(this.dmsfolderservice.dmslinkedfolders as  any as LocalDataSource);
this.dmslinkedfolderssource.setPaging(1, 20, true);
}
}

//external to inline
/*
dmslinkedfoldersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.dmsfolderservice.dmslinkedfolders.length == 0)
{
    this.tbldmslinkedfolderssource.grid.createFormShown = true;
}
else
{
    let obj = new dmslinkedfolder();
    this.dmsfolderservice.dmslinkedfolders.push(obj);
    this.dmslinkedfolderssource.refresh();
    if ((this.dmsfolderservice.dmslinkedfolders.length / this.dmslinkedfolderssource.getPaging().perPage).toFixed(0) + 1 != this.dmslinkedfolderssource.getPaging().page)
    {
        this.dmslinkedfolderssource.setPage((this.dmsfolderservice.dmslinkedfolders.length / this.dmslinkedfolderssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tbldmslinkedfolderssource.grid.edit(this.tbldmslinkedfolderssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.dmslinkedfolderssource.data.indexOf(event.data);
this.onDeletedmslinkedfolder(event,event.data.linkedid,((this.dmslinkedfolderssource.getPaging().page-1) *this.dmslinkedfolderssource.getPaging().perPage)+index);
this.dmslinkedfolderssource.refresh();
break;
}
}

*/
dmslinkedfoldersroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditdmslinkedfolder(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditdmslinkedfolder(event,event.data.linkedid,this.formid);
break;
case 'delete':
this.onDeletedmslinkedfolder(event,event.data.linkedid,((this.dmslinkedfolderssource.getPaging().page-1) *this.dmslinkedfolderssource.getPaging().perPage)+event.index);
this.dmslinkedfolderssource.refresh();
break;
}
}
dmslinkedfoldersonDelete(obj) {
let linkedid=obj.data.linkedid;
if (confirm('Are you sure to delete this record ?')) {
this.dmsfolderservice.deletedmsfolder(linkedid).then(res=>
this.dmslinkedfoldersLoadTable()
);
}
}
dmslinkedfoldersPaging(val)
{
debugger;
this.dmslinkedfolderssource.setPaging(1, val, true);
}

handledmslinkedfoldersGridSelected(event:any) {
this.dmslinkedfoldersselectedindex=this.dmsfolderservice.dmslinkedfolders.findIndex(i => i.linkedid === event.data.linkedid);
}
IsdmslinkedfoldersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.dmslinkedfoldersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes dmslinkedfolders

}



