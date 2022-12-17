import { erpsupplierpackingdetailService } from './../../../service/erpsupplierpackingdetail.service';
import { erpsupplierpackingdetail } from './../../../model/erpsupplierpackingdetail.model';
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
import { erppurchaseordermaster} from './../../../model/erppurchaseordermaster.model';
import { erppurchaseordermasterComponent } from './../../../pages/forms/erppurchaseordermaster/erppurchaseordermaster.component';
import { erppurchaseordermasterService } from './../../../service/erppurchaseordermaster.service';
//popups
import { erpsupplierpackingmaster} from './../../../model/erpsupplierpackingmaster.model';
import { erpsupplierpackingmasterComponent } from './../../../pages/forms/erpsupplierpackingmaster/erpsupplierpackingmaster.component';
import { erpsupplierpackingmasterService } from './../../../service/erpsupplierpackingmaster.service';
//popups
//detail table services
import { erpsupplierpackingitem } from './../../../model/erpsupplierpackingitem.model';
import { erpsupplierpackingitemComponent } from './../../../pages/forms/erpsupplierpackingitem/erpsupplierpackingitem.component';
//FK services
import { erpitemmaster,IerpitemmasterResponse } from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
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
selector: 'app-erpsupplierpackingdetail',
templateUrl: './erpsupplierpackingdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erpsupplierpackingdetailComponent implements OnInit {
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
bfilterPopulateerpsupplierpackingdetails:boolean=false;
dataerpsupplierpackingdetailspoid3:any=[];
dataerpsupplierpackingdetailssupplierpkgid3:any=[];
dataerpsupplierpackingdetailssupplierpkgdetailid3:any=[];
dataerpsupplierpackingitemsitemid3:any=[];
dataerpsupplierpackingitemsuom3:any=[];
dataerpsupplierpackingitemspoid3:any=[];
dataerpsupplierpackingitemssupplierpkgid3:any=[];
dataerpsupplierpackingitemssupplierpkgdetailid3:any=[];
bfilterPopulateerpsupplierpackingitems:boolean=false;
@ViewChild('tblerpsupplierpackingitemssource',{static:false}) tblerpsupplierpackingitemssource: Ng2SmartTableComponent;
 erpsupplierpackingdetailForm: FormGroup;
poidList: erppurchaseordermaster[];
poidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
poid_erppurchaseordermastersForm: FormGroup;//autocomplete
poid_erppurchaseordermastersoptions:any;//autocomplete
poid_erppurchaseordermastersformatter:any;//autocomplete
supplierpkgidList: erpsupplierpackingmaster[];
supplierpkgidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierpkgid_erpsupplierpackingmastersForm: FormGroup;//autocomplete
supplierpkgid_erpsupplierpackingmastersoptions:any;//autocomplete
supplierpkgid_erpsupplierpackingmastersformatter:any;//autocomplete
supplierpkgdetailidList: erpsupplierpackingdetail[];
supplierpkgdetailidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierpkgdetailid_erpsupplierpackingdetailsForm: FormGroup;//autocomplete
supplierpkgdetailid_erpsupplierpackingdetailsoptions:any;//autocomplete
supplierpkgdetailid_erpsupplierpackingdetailsformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erpsupplierpackingdetailshowOption:boolean;
erpsupplierpackingitemshowOption:boolean;
sessiondata:any;
sourcekey:any;



erpsupplierpackingitemsvisiblelist:any;
erpsupplierpackingitemshidelist:any;

DeletederpsupplierpackingitemIDs: string="";
erpsupplierpackingitemsID: string = "1";
erpsupplierpackingitemsselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erpsupplierpackingdetailservice: erpsupplierpackingdetailService,
private erpitemmasterservice: erpitemmasterService,
private erppurchaseordermasterservice: erppurchaseordermasterService,
private erpsupplierpackingmasterservice: erpsupplierpackingmasterService,
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
this.erpsupplierpackingdetailForm  = this.fb.group({
pk:[null],
poid: [null],
poiddesc: [null],
supplierpkgid: [null],
supplierpkgiddesc: [null],
supplierpkgdetailid: [null],
supplierpkgdetailiddesc: [null],
cartonnumber: [null],
dimension: [null],
weight: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erpsupplierpackingdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erpsupplierpackingdetailForm.dirty && this.erpsupplierpackingdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.supplierpkgdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.supplierpkgdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.supplierpkgdetailid && pkDetail) {
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
let erpsupplierpackingdetailid = null;

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
this.formid=erpsupplierpackingdetailid;
//this.sharedService.alert(erpsupplierpackingdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterpsupplierpackingitemsTableConfig();
  setTimeout(() => {
  this.SeterpsupplierpackingitemsTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erppurchaseordermasterservice.geterppurchaseordermastersList().then(res => 
{
this.poidList = res as erppurchaseordermaster[];
if(this.erpsupplierpackingdetailservice.formData && this.erpsupplierpackingdetailservice.formData.poid){
this.poidoptionsEvent.emit(this.poidList);
this.erpsupplierpackingdetailForm.patchValue({
    poid: this.erpsupplierpackingdetailservice.formData.poid,
    poiddesc: this.erpsupplierpackingdetailservice.formData.poiddesc,
});
}
{
let arrpoid = this.poidList.filter(v => v.poid == this.erpsupplierpackingdetailForm.get('poid').value);
let objpoid;
if (arrpoid.length > 0) objpoid = arrpoid[0];
if (objpoid)
{
}
}
}
).catch((err) => {console.log(err);});
this.poid_erppurchaseordermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.poidList.filter(v => v.ponumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.poid_erppurchaseordermastersformatter = (result: any) => result.ponumber;
this.erpsupplierpackingmasterservice.geterpsupplierpackingmastersList().then(res => 
{
this.supplierpkgidList = res as erpsupplierpackingmaster[];
if(this.erpsupplierpackingdetailservice.formData && this.erpsupplierpackingdetailservice.formData.supplierpkgid){
this.supplierpkgidoptionsEvent.emit(this.supplierpkgidList);
this.erpsupplierpackingdetailForm.patchValue({
    supplierpkgid: this.erpsupplierpackingdetailservice.formData.supplierpkgid,
    supplierpkgiddesc: this.erpsupplierpackingdetailservice.formData.supplierpkgiddesc,
});
}
{
let arrsupplierpkgid = this.supplierpkgidList.filter(v => v.supplierpkgid == this.erpsupplierpackingdetailForm.get('supplierpkgid').value);
let objsupplierpkgid;
if (arrsupplierpkgid.length > 0) objsupplierpkgid = arrsupplierpkgid[0];
if (objsupplierpkgid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierpkgid_erpsupplierpackingmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplierpkgidList.filter(v => v.packinglotnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierpkgid_erpsupplierpackingmastersformatter = (result: any) => result.packinglotnumber;
this.erpsupplierpackingdetailservice.geterpsupplierpackingdetailsList().then(res => 
{
this.supplierpkgdetailidList = res as erpsupplierpackingdetail[];
if(this.erpsupplierpackingdetailservice.formData && this.erpsupplierpackingdetailservice.formData.supplierpkgdetailid){
this.supplierpkgdetailidoptionsEvent.emit(this.supplierpkgdetailidList);
this.erpsupplierpackingdetailForm.patchValue({
    supplierpkgdetailid: this.erpsupplierpackingdetailservice.formData.supplierpkgdetailid,
    supplierpkgdetailiddesc: this.erpsupplierpackingdetailservice.formData.supplierpkgdetailiddesc,
});
}
{
let arrsupplierpkgdetailid = this.supplierpkgdetailidList.filter(v => v.supplierpkgdetailid == this.erpsupplierpackingdetailForm.get('supplierpkgdetailid').value);
let objsupplierpkgdetailid;
if (arrsupplierpkgdetailid.length > 0) objsupplierpkgdetailid = arrsupplierpkgdetailid[0];
if (objsupplierpkgdetailid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierpkgdetailid_erpsupplierpackingdetailsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplierpkgdetailidList.filter(v => v.cartonnumber.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierpkgdetailid_erpsupplierpackingdetailsformatter = (result: any) => result.cartonnumber;

//autocomplete
    this.erpsupplierpackingdetailservice.geterpsupplierpackingdetailsList().then(res => {
      this.pkList = res as erpsupplierpackingdetail[];
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
this.erpsupplierpackingdetailForm.markAsUntouched();
this.erpsupplierpackingdetailForm.markAsPristine();
}
onSelectedpoid(poidDetail: any) {
if (poidDetail.poid && poidDetail) {
this.erpsupplierpackingdetailForm.patchValue({
poid: poidDetail.poid,
poiddesc: poidDetail.ponumber,

});

}
}

onSelectedsupplierpkgid(supplierpkgidDetail: any) {
if (supplierpkgidDetail.supplierpkgid && supplierpkgidDetail) {
this.erpsupplierpackingdetailForm.patchValue({
supplierpkgid: supplierpkgidDetail.supplierpkgid,
supplierpkgiddesc: supplierpkgidDetail.packinglotnumber,

});

}
}

onSelectedsupplierpkgdetailid(supplierpkgdetailidDetail: any) {
if (supplierpkgdetailidDetail.supplierpkgdetailid && supplierpkgdetailidDetail) {
this.erpsupplierpackingdetailForm.patchValue({
supplierpkgdetailid: supplierpkgdetailidDetail.supplierpkgdetailid,
supplierpkgdetailiddesc: supplierpkgdetailidDetail.cartonnumber,

});

}
}




resetForm() {
if (this.erpsupplierpackingdetailForm != null)
this.erpsupplierpackingdetailForm.reset();
this.erpsupplierpackingdetailForm.patchValue({
});
setTimeout(() => {
this.erpsupplierpackingdetailservice.erpsupplierpackingitems=[];
this.erpsupplierpackingitemsLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let supplierpkgdetailid = this.erpsupplierpackingdetailForm.get('supplierpkgdetailid').value;
        if(supplierpkgdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erpsupplierpackingdetailservice.deleteerpsupplierpackingdetail(supplierpkgdetailid).then(res =>
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
    this.erpsupplierpackingdetailForm.patchValue({
        supplierpkgdetailid: null
    });
    if(this.erpsupplierpackingdetailservice.formData.supplierpkgdetailid!=null)this.erpsupplierpackingdetailservice.formData.supplierpkgdetailid=null;
for (let i=0;i<this.erpsupplierpackingdetailservice.erpsupplierpackingitems.length;i++) {
this.erpsupplierpackingdetailservice.erpsupplierpackingitems[i].supplierpkgitemid=null;
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
this.erpsupplierpackingdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erpsupplierpackingdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erpsupplierpackingdetailForm.controls[key]!=undefined)
{
this.erpsupplierpackingdetailForm.controls[key].disable({onlySelf: true});
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
poidonChange(evt:any){
let e=evt.value;
}
supplierpkgidonChange(evt:any){
let e=evt.value;
}
supplierpkgdetailidonChange(evt:any){
let e=evt.value;
}
cartonnumberonChange(evt:any){
let e=evt.value;
}
dimensiononChange(evt:any){
let e=evt.value;
}
weightonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerpsupplierpackingdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erpsupplierpackingdetailservice.geterpsupplierpackingdetailsByEID(pkcol).then(res => {

this.erpsupplierpackingdetailservice.formData=res.erpsupplierpackingdetail;
let formproperty=res.erpsupplierpackingdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erpsupplierpackingdetail.pkcol;
this.formid=res.erpsupplierpackingdetail.supplierpkgdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erpsupplierpackingdetail.supplierpkgdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erpsupplierpackingdetailForm.patchValue({
poid: res.erpsupplierpackingdetail.poid,
poiddesc: res.erpsupplierpackingdetail.poiddesc,
supplierpkgid: res.erpsupplierpackingdetail.supplierpkgid,
supplierpkgiddesc: res.erpsupplierpackingdetail.supplierpkgiddesc,
supplierpkgdetailid: res.erpsupplierpackingdetail.supplierpkgdetailid,
supplierpkgdetailiddesc: res.erpsupplierpackingdetail.supplierpkgdetailiddesc,
cartonnumber: res.erpsupplierpackingdetail.cartonnumber,
dimension: res.erpsupplierpackingdetail.dimension,
weight: res.erpsupplierpackingdetail.weight,
status: res.erpsupplierpackingdetail.status,
statusdesc: res.erpsupplierpackingdetail.statusdesc,
});
this.erpsupplierpackingitemsvisiblelist=res.erpsupplierpackingitemsvisiblelist;
//Child Tables if any
this.erpsupplierpackingdetailservice.erpsupplierpackingitems = res.erpsupplierpackingitems;
this.SeterpsupplierpackingitemsTableConfig();
this.erpsupplierpackingitemsLoadTable();
  setTimeout(() => {
  this.SeterpsupplierpackingitemsTableddConfig();
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
  for (let key in this.erpsupplierpackingdetailForm.controls) {
    if (this.erpsupplierpackingdetailForm.controls[key] != null) {
if(false)
{
if(this.erpsupplierpackingdetailservice.formData!=null && this.erpsupplierpackingdetailservice.formData[key]!=null  && this.erpsupplierpackingdetailservice.formData[key]!='[]' && this.erpsupplierpackingdetailservice.formData[key]!=undefined && this.erpsupplierpackingdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erpsupplierpackingdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erpsupplierpackingdetailservice.formData!=null && this.erpsupplierpackingdetailservice.formData[key]!=null   && this.erpsupplierpackingdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erpsupplierpackingdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erpsupplierpackingdetailservice.formData!=null && this.erpsupplierpackingdetailservice.formData[key]!=null   && this.erpsupplierpackingdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erpsupplierpackingdetailservice.formData[key]+"'><div class='progress__number'>"+this.erpsupplierpackingdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erpsupplierpackingdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erpsupplierpackingdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erpsupplierpackingdetailForm.value;
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

private erpsupplierpackingdetailtoggleOption(){
this.erpsupplierpackingdetailshowOption = this.erpsupplierpackingdetailshowOption === true ? false : true;
}

private erpsupplierpackingitemtoggleOption(){
this.erpsupplierpackingitemshowOption = this.erpsupplierpackingitemshowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erpsupplierpackingdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erpsupplierpackingdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erpsupplierpackingdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erpsupplierpackingdetailservice.formData=this.erpsupplierpackingdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erpsupplierpackingdetailForm.controls[key] != null)
    {
        this.erpsupplierpackingdetailservice.formData[key] = this.erpsupplierpackingdetailForm.controls[key].value;
    }
}
}
}
this.erpsupplierpackingdetailservice.formData.DeletederpsupplierpackingitemIDs = this.DeletederpsupplierpackingitemIDs;
console.log(this.erpsupplierpackingdetailservice.formData);
this.erpsupplierpackingdetailservice.formData=this.erpsupplierpackingdetailForm.value;
this.erpsupplierpackingdetailservice.saveOrUpdateerpsupplierpackingdetails().subscribe(
async res => {
if (this.erpsupplierpackingitemssource.data)
{
    for (let i = 0; i < this.erpsupplierpackingitemssource.data.length; i++)
    {
        if (this.erpsupplierpackingitemssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erpsupplierpackingitemssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierpackingdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erpsupplierpackingdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erpsupplierpackingdetail);
}
else
{
this.FillData(res);
}
}
this.erpsupplierpackingdetailForm.markAsUntouched();
this.erpsupplierpackingdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditpoid( poid) {
/*let ScreenType='2';
this.dialog.open(erppurchaseordermasterComponent, 
{
data: {poid:this.erpsupplierpackingdetailForm.get('poid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierpkgid( supplierpkgid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierpackingmasterComponent, 
{
data: {supplierpkgid:this.erpsupplierpackingdetailForm.get('supplierpkgid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierpkgdetailid( supplierpkgdetailid) {
/*let ScreenType='2';
this.dialog.open(erpsupplierpackingdetailComponent, 
{
data: {supplierpkgdetailid:this.erpsupplierpackingdetailForm.get('supplierpkgdetailid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditerpsupplierpackingitem(event:any,supplierpkgitemid:any, supplierpkgdetailid:any) {
let add=false;
if(event==null)add=true;
this.dialog.open(erpsupplierpackingitemComponent, 
{
data:  {  showview:false,save:false,event,supplierpkgitemid, supplierpkgdetailid,visiblelist:this.erpsupplierpackingitemsvisiblelist,  hidelist:this.erpsupplierpackingitemshidelist,ScreenType:2  },
} 
).onClose.subscribe(res => {
if(res)
{
if(add)
{
this.erpsupplierpackingitemssource.add(res);
this.erpsupplierpackingitemssource.refresh();
}
else
{
this.erpsupplierpackingitemssource.update(event.data, res);
}
}
});
}

onDeleteerpsupplierpackingitem(event:any,childID: number, i: number) {
if (childID != null)
this.DeletederpsupplierpackingitemIDs += childID + ",";
this.erpsupplierpackingdetailservice.erpsupplierpackingitems.splice(i, 1);
//this.updateGrandTotal();
}


PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erpsupplierpackingitems
erpsupplierpackingitemssettings:any;
erpsupplierpackingitemssource: any;

showerpsupplierpackingitemsCheckbox()
{
debugger;
if(this.tblerpsupplierpackingitemssource.settings['selectMode']== 'multi')this.tblerpsupplierpackingitemssource.settings['selectMode']= 'single';
else
this.tblerpsupplierpackingitemssource.settings['selectMode']= 'multi';
this.tblerpsupplierpackingitemssource.initGrid();
}
deleteerpsupplierpackingitemsAll()
{
this.tblerpsupplierpackingitemssource.settings['selectMode'] = 'single';
}
showerpsupplierpackingitemsFilter()
{
  setTimeout(() => {
  this.SeterpsupplierpackingitemsTableddConfig();
  });
      if(this.tblerpsupplierpackingitemssource.settings!=null)this.tblerpsupplierpackingitemssource.settings['hideSubHeader'] =!this.tblerpsupplierpackingitemssource.settings['hideSubHeader'];
this.tblerpsupplierpackingitemssource.initGrid();
}
showerpsupplierpackingitemsInActive()
{
}
enableerpsupplierpackingitemsInActive()
{
}
async SeterpsupplierpackingitemsTableddConfig()
{
if(!this.bfilterPopulateerpsupplierpackingitems){
}
this.bfilterPopulateerpsupplierpackingitems=true;
}
async erpsupplierpackingitemsbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterpsupplierpackingitemsTableConfig()
{
this.erpsupplierpackingitemssettings = {
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
poid: {
title: 'P O',
type: 'number',
filter:true,
},
supplierpkgid: {
title: 'Supplier Pkg',
type: 'number',
filter:true,
},
itemid: {
title: 'Item',
type: 'number',
filter:true,
},
uom: {
title: 'U O M',
type: '',
filter:true,
},
qty: {
title: 'Qty',
type: '',
filter:true,
},
serialbatch: {
title: 'Serial Batch',
type: '',
filter:true,
},
},
};
}
erpsupplierpackingitemsLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierpackingitemsID)>=0)
{
this.erpsupplierpackingitemssource=new LocalDataSource();
this.erpsupplierpackingitemssource.load(this.erpsupplierpackingdetailservice.erpsupplierpackingitems as  any as LocalDataSource);
this.erpsupplierpackingitemssource.setPaging(1, 20, true);
}
}

//external to inline
/*
erpsupplierpackingitemsroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erpsupplierpackingdetailservice.erpsupplierpackingitems.length == 0)
{
    this.tblerpsupplierpackingitemssource.grid.createFormShown = true;
}
else
{
    let obj = new erpsupplierpackingitem();
    this.erpsupplierpackingdetailservice.erpsupplierpackingitems.push(obj);
    this.erpsupplierpackingitemssource.refresh();
    if ((this.erpsupplierpackingdetailservice.erpsupplierpackingitems.length / this.erpsupplierpackingitemssource.getPaging().perPage).toFixed(0) + 1 != this.erpsupplierpackingitemssource.getPaging().page)
    {
        this.erpsupplierpackingitemssource.setPage((this.erpsupplierpackingdetailservice.erpsupplierpackingitems.length / this.erpsupplierpackingitemssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerpsupplierpackingitemssource.grid.edit(this.tblerpsupplierpackingitemssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erpsupplierpackingitemssource.data.indexOf(event.data);
this.onDeleteerpsupplierpackingitem(event,event.data.supplierpkgitemid,((this.erpsupplierpackingitemssource.getPaging().page-1) *this.erpsupplierpackingitemssource.getPaging().perPage)+index);
this.erpsupplierpackingitemssource.refresh();
break;
}
}

*/
erpsupplierpackingitemsroute(event:any,action:any) {
    var addparam="";
    if(this.currentRoute.snapshot.paramMap.get('tableid')!=null)
    {
      addparam="/show/"+this.currentRoute.snapshot.paramMap.get('tableid');
    }

switch ( action) {
case 'create':
this.AddOrEditerpsupplierpackingitem(event,null, this.formid);
break;
case 'view':
break;
case 'edit':
this.AddOrEditerpsupplierpackingitem(event,event.data.supplierpkgitemid,this.formid);
break;
case 'delete':
this.onDeleteerpsupplierpackingitem(event,event.data.supplierpkgitemid,((this.erpsupplierpackingitemssource.getPaging().page-1) *this.erpsupplierpackingitemssource.getPaging().perPage)+event.index);
this.erpsupplierpackingitemssource.refresh();
break;
}
}
erpsupplierpackingitemsonDelete(obj) {
let supplierpkgitemid=obj.data.supplierpkgitemid;
if (confirm('Are you sure to delete this record ?')) {
this.erpsupplierpackingdetailservice.deleteerpsupplierpackingdetail(supplierpkgitemid).then(res=>
this.erpsupplierpackingitemsLoadTable()
);
}
}
erpsupplierpackingitemsPaging(val)
{
debugger;
this.erpsupplierpackingitemssource.setPaging(1, val, true);
}

handleerpsupplierpackingitemsGridSelected(event:any) {
this.erpsupplierpackingitemsselectedindex=this.erpsupplierpackingdetailservice.erpsupplierpackingitems.findIndex(i => i.supplierpkgitemid === event.data.supplierpkgitemid);
}
IserpsupplierpackingitemsVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erpsupplierpackingitemsID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erpsupplierpackingitems

}



