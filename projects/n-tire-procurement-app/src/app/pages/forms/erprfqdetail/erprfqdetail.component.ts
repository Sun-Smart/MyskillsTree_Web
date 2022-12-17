import { erprfqdetailService } from './../../../service/erprfqdetail.service';
import { erprfqdetail } from './../../../model/erprfqdetail.model';
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
import { erppurchaserequestdetail} from './../../../model/erppurchaserequestdetail.model';
import { erppurchaserequestdetailComponent } from './../../../pages/forms/erppurchaserequestdetail/erppurchaserequestdetail.component';
import { erppurchaserequestdetailService } from './../../../service/erppurchaserequestdetail.service';
//popups
import { erprfqmaster} from './../../../model/erprfqmaster.model';
import { erprfqmasterComponent } from './../../../pages/forms/erprfqmaster/erprfqmaster.component';
import { erprfqmasterService } from './../../../service/erprfqmaster.service';
//popups
import { erpitemmaster} from './../../../model/erpitemmaster.model';
import { erpitemmasterComponent } from './../../../pages/forms/erpitemmaster/erpitemmaster.component';
import { erpitemmasterService } from './../../../service/erpitemmaster.service';
//popups
import { bomasterdata} from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
//popups
import { erpsuppliermaster} from './../../../model/erpsuppliermaster.model';
import { erpsuppliermasterComponent } from './../../../pages/forms/erpsuppliermaster/erpsuppliermaster.component';
import { erpsuppliermasterService } from './../../../service/erpsuppliermaster.service';
//popups
import { bousermaster} from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.component';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
//popups
//detail table services
import { erprfqsupplier } from './../../../model/erprfqsupplier.model';
import { erprfqsupplierComponent } from './../../../pages/forms/erprfqsupplier/erprfqsupplier.component';
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
selector: 'app-erprfqdetail',
templateUrl: './erprfqdetail.component.html',
styles: [],
providers: [ KeyboardShortcutsService ]
})



export class erprfqdetailComponent implements OnInit {
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
bfilterPopulateerprfqdetails:boolean=false;
dataerprfqdetailsrfqdetailid3:any=[];
dataerprfqdetailsrfqid3:any=[];
dataerprfqdetailsitemid3:any=[];
dataerprfqdetailsitemtype3:any=[];
dataerprfqdetailsitemcategory3:any=[];
dataerprfqdetailsuom3:any=[];
dataerprfqdetailssupplierid3:any=[];
dataerprfqdetailsapprovalstatus3:any=[];
dataerprfqdetailsapprovedby3:any=[];
dataerprfqsupplierssupplierid3:any=[];
dataerprfqsuppliersrfqdetailid3:any=[];
dataerprfqsuppliersrfqid3:any=[];
bfilterPopulateerprfqsuppliers:boolean=false;
@ViewChild('tblerprfqsupplierssource',{static:false}) tblerprfqsupplierssource: Ng2SmartTableComponent;
 erprfqdetailForm: FormGroup;
rfqdetailidList: erppurchaserequestdetail[];
rfqdetailidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
rfqdetailid_erppurchaserequestdetailsForm: FormGroup;//autocomplete
rfqdetailid_erppurchaserequestdetailsoptions:any;//autocomplete
rfqdetailid_erppurchaserequestdetailsformatter:any;//autocomplete
rfqidList: erprfqmaster[];
rfqidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
rfqid_erprfqmastersForm: FormGroup;//autocomplete
rfqid_erprfqmastersoptions:any;//autocomplete
rfqid_erprfqmastersformatter:any;//autocomplete
itemidList: erpitemmaster[];
itemidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
itemid_erpitemmastersForm: FormGroup;//autocomplete
itemid_erpitemmastersoptions:any;//autocomplete
itemid_erpitemmastersformatter:any;//autocomplete
itemtypeList: boconfigvalue[];
itemcategoryList: bomasterdata[];
uomList: boconfigvalue[];
supplieridList: erpsuppliermaster[];
supplieridoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
supplierid_erpsuppliermastersForm: FormGroup;//autocomplete
supplierid_erpsuppliermastersoptions:any;//autocomplete
supplierid_erpsuppliermastersformatter:any;//autocomplete
approvalstatusList: boconfigvalue[];
approvedbyList: bousermaster[];
approvedbyoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
approvedby_bousermastersForm: FormGroup;//autocomplete
approvedby_bousermastersoptions:any;//autocomplete
approvedby_bousermastersformatter:any;//autocomplete
private exportTime= { hour: 7, minute: 15, meriden: 'PM', format: 24 };
showformtype:any;
formid:any;
pkcol:any;
SESSIONUSERID:any;//current user
erprfqdetailshowOption:boolean;
erprfqsuppliershowOption:boolean;
sessiondata:any;
sourcekey:any;



erprfqsuppliersvisiblelist:any;
erprfqsuppliershidelist:any;

DeletederprfqsupplierIDs: string="";
erprfqsuppliersID: string = "1";
erprfqsuppliersselectedindex:any;


constructor(
private nav: Location,
private translate: TranslateService,
private keyboard: KeyboardShortcutsService,private router: Router,
private ngbDateParserFormatter: NgbDateParserFormatter,
public dialogRef: DynamicDialogRef,
public dynamicconfig: DynamicDialogConfig,
public dialog: DialogService,
private erprfqdetailservice: erprfqdetailService,
private erpsuppliermasterservice: erpsuppliermasterService,
private erppurchaserequestdetailservice: erppurchaserequestdetailService,
private erprfqmasterservice: erprfqmasterService,
private fb: FormBuilder,
private sharedService: SharedService,
private sessionService: SessionService,
private toastr: ToastService,
//private dialog: NbDialogService,
private configservice:boconfigvalueService,
private erpitemmasterservice:erpitemmasterService,
private bomasterdataservice:bomasterdataService,
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
this.erprfqdetailForm  = this.fb.group({
pk:[null],
rfqdetailid: [null],
rfqdetailiddesc: [null],
rfqid: [null],
rfqiddesc: [null],
itemid: [null],
itemiddesc: [null],
itemdescription: [null],
itemtype: [null],
itemtypedesc: [null],
itemcategory: [null],
itemcategorydesc: [null],
quantity: [null],
uom: [null],
uomdesc: [null],
requiredbefore: [null],
supplierid: [null],
supplieriddesc: [null],
approvalstatus: [null],
approvalstatusdesc: [null],
approvedby: [null],
approvedbydesc: [null],
status: [null],
statusdesc: [null],
});
}

get f() { return this.erprfqdetailForm.controls; }


//when child screens are clicked - it will be made invisible
ToolBar(prop)
{
this.toolbarvisible=prop;
}

//function called when we navigate to other page.defined in routing
canDeactivate(): Observable<boolean> | boolean {
debugger;
if (this.erprfqdetailForm.dirty && this.erprfqdetailForm.touched ) {
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
  let pos = this.pkList.map(function(e:any) { return e.rfqdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>0) this.PopulateScreen(this.pkList[pos-1].pkcol);
}

next()
{
  debugger;
let pos = this.pkList.map(function(e:any) { return e.rfqdetailid.toString(); }).indexOf(this.formid.toString());
  if(pos>=0 && pos!=this.pkList.length) this.PopulateScreen(this.pkList[pos+1].pkcol);
}

//on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.rfqdetailid && pkDetail) {
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
let erprfqdetailid = null;

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
this.formid=erprfqdetailid;
//this.sharedService.alert(erprfqdetailid);

//if pk is empty - go to resetting form.fill default values.otherwise, fetch records
if (this.pkcol == null){
this.SeterprfqsuppliersTableConfig();
  setTimeout(() => {
  this.SeterprfqsuppliersTableddConfig();
  });

this.resetForm();
}
else {
if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)await this.PopulateScreen(this.pkcol);
//get the record from api
//foreign keys 
}
this.erppurchaserequestdetailservice.geterppurchaserequestdetailsList().then(res => 
{
this.rfqdetailidList = res as erppurchaserequestdetail[];
if(this.erprfqdetailservice.formData && this.erprfqdetailservice.formData.rfqdetailid){
this.rfqdetailidoptionsEvent.emit(this.rfqdetailidList);
this.erprfqdetailForm.patchValue({
    rfqdetailid: this.erprfqdetailservice.formData.rfqdetailid,
    rfqdetailiddesc: this.erprfqdetailservice.formData.rfqdetailiddesc,
});
}
{
let arrrfqdetailid = this.rfqdetailidList.filter(v => v.prsdetailid == this.erprfqdetailForm.get('rfqdetailid').value);
let objrfqdetailid;
if (arrrfqdetailid.length > 0) objrfqdetailid = arrrfqdetailid[0];
if (objrfqdetailid)
{
}
}
}
).catch((err) => {console.log(err);});
this.rfqdetailid_erppurchaserequestdetailsoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.rfqdetailidList.filter(v => v.itemdescription.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.rfqdetailid_erppurchaserequestdetailsformatter = (result: any) => result.itemdescription;
this.erprfqmasterservice.geterprfqmastersList().then(res => 
{
this.rfqidList = res as erprfqmaster[];
if(this.erprfqdetailservice.formData && this.erprfqdetailservice.formData.rfqid){
this.rfqidoptionsEvent.emit(this.rfqidList);
this.erprfqdetailForm.patchValue({
    rfqid: this.erprfqdetailservice.formData.rfqid,
    rfqiddesc: this.erprfqdetailservice.formData.rfqiddesc,
});
}
{
let arrrfqid = this.rfqidList.filter(v => v.rfqid == this.erprfqdetailForm.get('rfqid').value);
let objrfqid;
if (arrrfqid.length > 0) objrfqid = arrrfqid[0];
if (objrfqid)
{
}
}
}
).catch((err) => {console.log(err);});
this.rfqid_erprfqmastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.rfqidList.filter(v => v.rfqcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.rfqid_erprfqmastersformatter = (result: any) => result.rfqcode;
this.erpitemmasterservice.geterpitemmastersList().then(res => 
{
this.itemidList = res as erpitemmaster[];
if(this.erprfqdetailservice.formData && this.erprfqdetailservice.formData.itemid){
this.itemidoptionsEvent.emit(this.itemidList);
this.erprfqdetailForm.patchValue({
    itemid: this.erprfqdetailservice.formData.itemid,
    itemiddesc: this.erprfqdetailservice.formData.itemiddesc,
});
}
{
let arritemid = this.itemidList.filter(v => v.itemid == this.erprfqdetailForm.get('itemid').value);
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
: this.itemidList.filter(v => v.itemcode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.itemid_erpitemmastersformatter = (result: any) => result.itemcode;
this.configservice.getList("itemtype").then(res => this.itemtypeList = res as boconfigvalue[]);
this.bomasterdataservice.getList("rs8fd").then(res => {
this.itemcategoryList = res as bomasterdata[];
}).catch((err) => {console.log(err);});
this.configservice.getList("uom").then(res => this.uomList = res as boconfigvalue[]);
this.erpsuppliermasterservice.geterpsuppliermastersList().then(res => 
{
this.supplieridList = res as erpsuppliermaster[];
if(this.erprfqdetailservice.formData && this.erprfqdetailservice.formData.supplierid){
this.supplieridoptionsEvent.emit(this.supplieridList);
this.erprfqdetailForm.patchValue({
    supplierid: this.erprfqdetailservice.formData.supplierid,
    supplieriddesc: this.erprfqdetailservice.formData.supplieriddesc,
});
}
{
let arrsupplierid = this.supplieridList.filter(v => v.supplierid == this.erprfqdetailForm.get('supplierid').value);
let objsupplierid;
if (arrsupplierid.length > 0) objsupplierid = arrsupplierid[0];
if (objsupplierid)
{
}
}
}
).catch((err) => {console.log(err);});
this.supplierid_erpsuppliermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.supplieridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.supplierid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
this.configservice.getList("approvalstatus").then(res => this.approvalstatusList = res as boconfigvalue[]);
this.bousermasterservice.getbousermastersList().then(res => 
{
this.approvedbyList = res as bousermaster[];
if(this.erprfqdetailservice.formData && this.erprfqdetailservice.formData.approvedby){
this.approvedbyoptionsEvent.emit(this.approvedbyList);
this.erprfqdetailForm.patchValue({
    approvedby: this.erprfqdetailservice.formData.approvedby,
    approvedbydesc: this.erprfqdetailservice.formData.approvedbydesc,
});
}
{
let arrapprovedby = this.approvedbyList.filter(v => v.userid == this.erprfqdetailForm.get('approvedby').value);
let objapprovedby;
if (arrapprovedby.length > 0) objapprovedby = arrapprovedby[0];
if (objapprovedby)
{
}
}
}
).catch((err) => {console.log(err);});
this.approvedby_bousermastersoptions = (text$: Observable<string>) =>
text$.pipe(
debounceTime(200),
map(value => value.length < 2 ? []
: this.approvedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
);
this.approvedby_bousermastersformatter = (result: any) => result.username;

//autocomplete
    this.erprfqdetailservice.geterprfqdetailsList().then(res => {
      this.pkList = res as erprfqdetail[];
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
this.erprfqdetailForm.markAsUntouched();
this.erprfqdetailForm.markAsPristine();
}
onSelectedrfqdetailid(rfqdetailidDetail: any) {
if (rfqdetailidDetail.prsdetailid && rfqdetailidDetail) {
this.erprfqdetailForm.patchValue({
rfqdetailid: rfqdetailidDetail.prsdetailid,
rfqdetailiddesc: rfqdetailidDetail.itemdescription,

});

}
}

onSelectedrfqid(rfqidDetail: any) {
if (rfqidDetail.rfqid && rfqidDetail) {
this.erprfqdetailForm.patchValue({
rfqid: rfqidDetail.rfqid,
rfqiddesc: rfqidDetail.rfqcode,

});

}
}

onSelecteditemid(itemidDetail: any) {
if (itemidDetail.itemid && itemidDetail) {
this.erprfqdetailForm.patchValue({
itemid: itemidDetail.itemid,
itemiddesc: itemidDetail.itemcode,

});

}
}

onSelectedsupplierid(supplieridDetail: any) {
if (supplieridDetail.supplierid && supplieridDetail) {
this.erprfqdetailForm.patchValue({
supplierid: supplieridDetail.supplierid,
supplieriddesc: supplieridDetail.suppliercode,

});

}
}

onSelectedapprovedby(approvedbyDetail: any) {
if (approvedbyDetail.userid && approvedbyDetail) {
this.erprfqdetailForm.patchValue({
approvedby: approvedbyDetail.userid,
approvedbydesc: approvedbyDetail.username,

});

}
}




resetForm() {
if (this.erprfqdetailForm != null)
this.erprfqdetailForm.reset();
this.erprfqdetailForm.patchValue({
approvedby: this.sessiondata.userid,
approvedbydesc: this.sessiondata.username,
});
setTimeout(() => {
this.erprfqdetailservice.erprfqsuppliers=[];
this.erprfqdetailservice.Inserterprfqsuppliers=[];
this.erprfqsuppliersLoadTable();
});
this.PopulateFromMainScreen(this.data,false);
this.PopulateFromMainScreen(this.dynamicconfig.data,true);
}

    onDelete() {
        let rfqdetailid = this.erprfqdetailForm.get('rfqdetailid').value;
        if(rfqdetailid!=null)
        {
        if (confirm('Are you sure to delete this record ?')) {
            this.erprfqdetailservice.deleteerprfqdetail(rfqdetailid).then(res =>
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
    this.erprfqdetailForm.patchValue({
        rfqdetailid: null
    });
    if(this.erprfqdetailservice.formData.rfqdetailid!=null)this.erprfqdetailservice.formData.rfqdetailid=null;
for (let i=0;i<this.erprfqdetailservice.erprfqsuppliers.length;i++) {
this.erprfqdetailservice.erprfqsuppliers[i].rfqitemsupplierid=null;
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
        else if(key=="requiredbefore")
this.erprfqdetailForm.patchValue({"requiredbefore":this.ngbDateParserFormatter.parse(mainscreendata[key]) });
        else if(ctrltype=="string")
{
this.erprfqdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
        else
{
this.erprfqdetailForm.patchValue({[key]:  mainscreendata[key] } );
}
{
{
         if(bdisable && this.erprfqdetailForm.controls[key]!=undefined)
{
this.erprfqdetailForm.controls[key].disable({onlySelf: true});
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
rfqdetailidonChange(evt:any){
let e=evt.value;
}
rfqidonChange(evt:any){
let e=evt.value;
}
itemidonChange(evt:any){
let e=evt.value;
}
itemdescriptiononChange(evt:any){
let e=evt.value;
}
itemtypeonChange(evt:any){
let e=this.f.itemtype.value as any;
this.erprfqdetailForm.patchValue({itemtypedesc:evt.options[evt.options.selectedIndex].text});
}
itemcategoryonChange(evt:any){
let e=evt.value;
this.erprfqdetailForm.patchValue({itemcategorydesc:evt.options[evt.options.selectedIndex].text});
}
quantityonChange(evt:any){
let e=evt.value;
}
uomonChange(evt:any){
let e=this.f.uom.value as any;
this.erprfqdetailForm.patchValue({uomdesc:evt.options[evt.options.selectedIndex].text});
}
requiredbeforeonChange(evt:any){
let e=evt.value;
}
supplieridonChange(evt:any){
let e=evt.value;
}
approvalstatusonChange(evt:any){
let e=this.f.approvalstatus.value as any;
this.erprfqdetailForm.patchValue({approvalstatusdesc:evt.options[evt.options.selectedIndex].text});
}
approvedbyonChange(evt:any){
let e=evt.value;
}
statusonChange(evt:any){
let e=evt.value;
}

editerprfqdetails() {
this.showview=false;
return false;
}



async PopulateScreen(pkcol:any){
this.erprfqdetailservice.geterprfqdetailsByEID(pkcol).then(res => {

this.erprfqdetailservice.formData=res.erprfqdetail;
let formproperty=res.erprfqdetail.formproperty;
if(formproperty && formproperty.edit==false)this.showview=true;
this.pkcol=res.erprfqdetail.pkcol;
this.formid=res.erprfqdetail.rfqdetailid;
this.FillData(res);
}).catch((err) => {console.log(err);});
}

FillData(res:any)
{
this.formid=res.erprfqdetail.rfqdetailid;
console.log(res);
//console.log(res.order);
//console.log(res.orderDetails);
this.erprfqdetailForm.patchValue({
rfqdetailid: res.erprfqdetail.rfqdetailid,
rfqdetailiddesc: res.erprfqdetail.rfqdetailiddesc,
rfqid: res.erprfqdetail.rfqid,
rfqiddesc: res.erprfqdetail.rfqiddesc,
itemid: res.erprfqdetail.itemid,
itemiddesc: res.erprfqdetail.itemiddesc,
itemdescription: res.erprfqdetail.itemdescription,
itemtype: res.erprfqdetail.itemtype,
itemtypedesc: res.erprfqdetail.itemtypedesc,
itemcategory: res.erprfqdetail.itemcategory,
itemcategorydesc: res.erprfqdetail.itemcategorydesc,
quantity: res.erprfqdetail.quantity,
uom: res.erprfqdetail.uom,
uomdesc: res.erprfqdetail.uomdesc,
requiredbefore: this.ngbDateParserFormatter.parse(res.erprfqdetail.requiredbefore),
supplierid: res.erprfqdetail.supplierid,
supplieriddesc: res.erprfqdetail.supplieriddesc,
approvalstatus: res.erprfqdetail.approvalstatus,
approvalstatusdesc: res.erprfqdetail.approvalstatusdesc,
approvedby: res.erprfqdetail.approvedby,
approvedbydesc: res.erprfqdetail.approvedbydesc,
status: res.erprfqdetail.status,
statusdesc: res.erprfqdetail.statusdesc,
});
this.erprfqsuppliersvisiblelist=res.erprfqsuppliersvisiblelist;
//Child Tables if any
this.erprfqdetailservice.erprfqsuppliers = res.erprfqsuppliers;
this.SeterprfqsuppliersTableConfig();
this.erprfqsuppliersLoadTable();
  setTimeout(() => {
  this.SeterprfqsuppliersTableddConfig();
  });
this.erprfqdetailservice.Inserterprfqsuppliers=[];
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
  for (let key in this.erprfqdetailForm.controls) {
    if (this.erprfqdetailForm.controls[key] != null) {
if(false)
{
if(this.erprfqdetailservice.formData!=null && this.erprfqdetailservice.formData[key]!=null  && this.erprfqdetailservice.formData[key]!='[]' && this.erprfqdetailservice.formData[key]!=undefined && this.erprfqdetailservice.formData[key].length>0)ret = ret.replace(new RegExp('##' + key + '##', 'g'),"http://localhost:5002/"+ JSON.parse(this.erprfqdetailservice.formData[key])[0]["name"]);
}
else if(false)
{
if(this.erprfqdetailservice.formData!=null && this.erprfqdetailservice.formData[key]!=null   && this.erprfqdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='Stars' style='--rating:"+ this.erprfqdetailservice.formData[key]+"></div>");
}
else if(false)
{
if(this.erprfqdetailservice.formData!=null && this.erprfqdetailservice.formData[key]!=null   && this.erprfqdetailservice.formData[key]!=undefined )ret = ret.replace(new RegExp('##' + key + '##', 'g'),"<div class='progress--circle progress--"+this.erprfqdetailservice.formData[key]+"'><div class='progress__number'>"+this.erprfqdetailservice.formData[key]+"%</div></div>");
}
else
      ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.erprfqdetailForm.controls[key].value);
    }
  }
  return ret;
}

async onSubmitDataDlg(bclear:any) {
this.isSubmitted = true;
if(!this.erprfqdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
var obj=this.erprfqdetailForm.value;
obj.requiredbefore=new Date(this.erprfqdetailForm.get('requiredbefore').value ? this.ngbDateParserFormatter.format(this.erprfqdetailForm.get('requiredbefore').value)+'  UTC' :null);
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

private erprfqdetailtoggleOption(){
this.erprfqdetailshowOption = this.erprfqdetailshowOption === true ? false : true;
}

private erprfqsuppliertoggleOption(){
this.erprfqsuppliershowOption = this.erprfqsuppliershowOption === true ? false : true;
}



async onSubmitData(bclear:any) {
debugger;
this.isSubmitted = true;
let strError="";
Object.keys(this.erprfqdetailForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.erprfqdetailForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            strError+='control: ' + key + ', Error: ' + keyError + '<BR>';
          });
        }
      });
if(strError!="")return this.sharedService.alert(strError);


if(!this.erprfqdetailForm.valid)
{
this.toastr.addSingle("error", "", "Enter the required fields");
return; 
}
if(!this.validate())
{
return;
}
this.erprfqdetailservice.formData=this.erprfqdetailForm.value;
if (this.dynamicconfig.data != null)
{
for (let key in this.dynamicconfig.data)
{
if(key!='visiblelist' && key!='hidelist'){
    if (this.erprfqdetailForm.controls[key] != null)
    {
        this.erprfqdetailservice.formData[key] = this.erprfqdetailForm.controls[key].value;
    }
}
}
}
this.erprfqdetailservice.formData.requiredbefore=new Date(this.erprfqdetailForm.get('requiredbefore').value ? this.ngbDateParserFormatter.format(this.erprfqdetailForm.get('requiredbefore').value)+'  UTC' :null);
this.erprfqdetailservice.formData.DeletederprfqsupplierIDs = this.DeletederprfqsupplierIDs;
console.log(this.erprfqdetailservice.formData);
this.erprfqdetailservice.formData=this.erprfqdetailForm.value;
this.erprfqdetailservice.saveOrUpdateerprfqdetails().subscribe(
async res => {
if (this.erprfqsupplierssource.data)
{
    for (let i = 0; i < this.erprfqsupplierssource.data.length; i++)
    {
        if (this.erprfqsupplierssource.data[i].fileattachmentlist)await this.sharedService.upload(this.erprfqsupplierssource.data[i].fileattachmentlist);
    }
}
debugger;
this.toastr.addSingle("success","","Successfully saved");
this.showview=true;
document.getElementById("contentArea1").scrollTop = 0;
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erprfqdetail);
    return;
}
else
{
document.getElementById("contentArea1").scrollTop = 0;
}
this.erprfqdetailservice.clearList();
if(bclear){
this.resetForm();
}
else{
if(this.maindata!=null && (this.maindata.ScreenType==1 || this.maindata.ScreenType==2))
{
this.dialogRef.close((res as any).erprfqdetail);
}
else
{
this.FillData(res);
}
}
this.erprfqdetailForm.markAsUntouched();
this.erprfqdetailForm.markAsPristine();
},
err => {
debugger;
this.toastr.addSingle("error","",err.error);
console.log(err);
}
)
}




//dropdown edit from the screen itself -> One screen like Reportviewer

AddOrEditrfqdetailid( prsdetailid) {
/*let ScreenType='2';
this.dialog.open(erppurchaserequestdetailComponent, 
{
data: {prsdetailid:this.erprfqdetailForm.get('rfqdetailid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditrfqid( rfqid) {
/*let ScreenType='2';
this.dialog.open(erprfqmasterComponent, 
{
data: {rfqid:this.erprfqdetailForm.get('rfqid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemid( itemid) {
/*let ScreenType='2';
this.dialog.open(erpitemmasterComponent, 
{
data: {itemid:this.erprfqdetailForm.get('itemid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEdititemcategory( masterdataid) {
/*let ScreenType='2';
this.dialog.open(bomasterdataComponent, 
{
data: {masterdataid:this.erprfqdetailForm.get('itemcategory').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditsupplierid( supplierid) {
/*let ScreenType='2';
this.dialog.open(erpsuppliermasterComponent, 
{
data: {supplierid:this.erprfqdetailForm.get('supplierid').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}


AddOrEditapprovedby( userid) {
/*let ScreenType='2';
this.dialog.open(bousermasterComponent, 
{
data: {userid:this.erprfqdetailForm.get('approvedby').value, ScreenType:2 }
} 
).onClose.subscribe(res => {
});*/
}



PrevForm() {
let formid=this.sessionService.getItem("key");
let prevform=this.sessionService.getItem("prevform");
this.router.navigate(["/home/"+ prevform + "/"+prevform+"/edit/" + formid]);
}
//start of Grid Codes erprfqsuppliers
onCustomerprfqsuppliersAction(event:any) {
debugger;
switch ( event.action) {
    case 'viewrecord':
      let val=event.data.pkcol;
      this.dialog.open(erpsuppliermasterComponent,
        {
          data: { showview: false, pkcol:val, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
      });
      break;
    }
  }
erprfqsupplierssettings:any;
erprfqsupplierssource: any;

showerprfqsuppliersCheckbox()
{
debugger;
if(this.tblerprfqsupplierssource.settings['selectMode']== 'multi')this.tblerprfqsupplierssource.settings['selectMode']= 'single';
else
this.tblerprfqsupplierssource.settings['selectMode']= 'multi';
this.tblerprfqsupplierssource.initGrid();
}
deleteerprfqsuppliersAll()
{
this.tblerprfqsupplierssource.settings['selectMode'] = 'single';
}
showerprfqsuppliersFilter()
{
  setTimeout(() => {
  this.SeterprfqsuppliersTableddConfig();
  });
      if(this.tblerprfqsupplierssource.settings!=null)this.tblerprfqsupplierssource.settings['hideSubHeader'] =!this.tblerprfqsupplierssource.settings['hideSubHeader'];
this.tblerprfqsupplierssource.initGrid();
}
showerprfqsuppliersInActive()
{
}
enableerprfqsuppliersInActive()
{
}
async SeterprfqsuppliersTableddConfig()
{
if(!this.bfilterPopulateerprfqsuppliers){
}
this.bfilterPopulateerprfqsuppliers=true;
}
async erprfqsuppliersbeforesave(event:any){
event.confirm.resolve(event.newData);



}
SeterprfqsuppliersTableConfig()
{
this.erprfqsupplierssettings = {
hideSubHeader: true,
mode: 'external',
selectMode: 'multi',
actions: {
columnTitle:'',
width:'300px',
add: false,
edit: false, 
delete: false,
custom: [
  { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>'}
],
},
columns: {
rfqitemsupplierid: {
title: 'R F Q Item Supplier',
type: '',
},
supplierid: {
title: 'Supplier',
type: '',
},
},
};
}
erprfqsuppliersLoadTable(){
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erprfqsuppliersID)>=0)
{
this.erprfqsupplierssource=new LocalDataSource();
this.erprfqsupplierssource.load(this.erprfqdetailservice.erprfqsuppliers as  any as LocalDataSource);
setTimeout(() => { 
if(this.tblerprfqsupplierssource!=null)
{this.tblerprfqsupplierssource.grid.getRows().forEach((row:any) => {
if(row.data.rfqitemsupplierid!=null && row.data.rfqitemsupplierid!="")
{
this.erprfqdetailservice.Inserterprfqsuppliers.push(row.data);
this.tblerprfqsupplierssource.grid.multipleSelectRow(row);
}
});
}
});
}
}

//external to inline
/*
erprfqsuppliersroute(event:any,action:any) {
switch ( action) {
case 'create':
if (this.erprfqdetailservice.erprfqsuppliers.length == 0)
{
    this.tblerprfqsupplierssource.grid.createFormShown = true;
}
else
{
    let obj = new erprfqsupplier();
    this.erprfqdetailservice.erprfqsuppliers.push(obj);
    this.erprfqsupplierssource.refresh();
    if ((this.erprfqdetailservice.erprfqsuppliers.length / this.erprfqsupplierssource.getPaging().perPage).toFixed(0) + 1 != this.erprfqsupplierssource.getPaging().page)
    {
        this.erprfqsupplierssource.setPage((this.erprfqdetailservice.erprfqsuppliers.length / this.erprfqsupplierssource.getPaging().perPage).toFixed(0) + 1);
    }
    setTimeout(() => {
        this.tblerprfqsupplierssource.grid.edit(this.tblerprfqsupplierssource.grid.getLastRow());
    });
}
break;
case 'delete':
let index = this.erprfqsupplierssource.data.indexOf(event.data);
this.onDeleteerprfqsupplier(event,event.data.rfqitemsupplierid,((this.erprfqsupplierssource.getPaging().page-1) *this.erprfqsupplierssource.getPaging().perPage)+index);
this.erprfqsupplierssource.refresh();
break;
}
}

*/
erprfqsuppliersPaging(val)
{
debugger;
this.erprfqsupplierssource.setPaging(1, val, true);
}

handleerprfqsuppliersGridSelected(event:any) {
debugger;

if(event.isSelected)
{
if(event.data.rfqitemsupplierid==null || event.data.rfqitemsupplierid=="")
{
var obj={rfqdetailid:this.formid,supplierid:event.data.supplierid}
this.erprfqdetailservice.Inserterprfqsuppliers.push(obj as any);
}
else
{
var deletedids=this.DeletederprfqsupplierIDs.split(',');

let i:number=0;
deletedids.forEach(id => {
if(id==event.data.rfqitemsupplierid)
{
deletedids.splice(i,1);
}
i++;
});
deletedids.join(",");
}
}
else
{
if(event.data.rfqitemsupplierid!=null && event.data.rfqitemsupplierid!="")this.DeletederprfqsupplierIDs += event.data.rfqitemsupplierid + ","; 
}
}
IserprfqsuppliersVisible()
{
if(this.ShowTableslist==null || this.ShowTableslist.length==0 || this.ShowTableslist.indexOf(this.erprfqsuppliersID)>=0)
{
return "tbl smart-table-container";
}
else
{
return "hide";
}
}
//end of Grid Codes erprfqsuppliers

}



