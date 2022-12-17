import { Component, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
import { RouteStateService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/route-state.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { MenuItem } from '../../../../../../n-tire-bo-app/src/app/pages/core/models/menu-item.model';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { ThemeService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/theme.service';
import { docviewerService } from '../../../service/docviewer.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
/*import {convertToHtml} from "mammoth/mammoth.browser";
import mammoth from "mammoth";*/
//import * as mammoth from 'mammoth';
//import { HttpClient } from "@angular/common/http";
//import { convertToHtml } from "mammoth";
//import * as mammoth from 'mammoth/mammoth.browser';
import { SafePipe } from '../../../../../../n-tire-bo-app/src/app/service/safe.pipe';
import * as JSZip from 'jszip';
import fileSaver from 'file-saver';
import { Guid } from "guid-typescript";
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-docviewer',
    templateUrl: './docviewer.component.html'
})
export class docviewerComponent implements AfterViewInit {
    dmsviewerForm: FormGroup;
    images: any[];
    items: any[];
    menuitems: any;
    selectedItem: string;
    theme: string;
    doc: any;
    cleanURL: any;
    doctype: string;
    contenttype: string;
    loadimage: boolean = false;

    searchresults: any;
    action: any = "";
    //mammoth: mammoth;
    currentfolder: string;
    blob: any;
    constructor(
        private fb: FormBuilder,
        private sanitizer: DomSanitizer, private routeStateService: RouteStateService, private docviewerservice: docviewerService,
        public sessionService: SessionService,
        private toastService: ToastService, private sharedService: SharedService, private themeService: ThemeService) {
        this.theme = "grey-theme";
        this.dmsviewerForm = this.fb.group({
            search: [null]
        });
    }


    async ngOnInit() {
        //this.doc="http://www.africau.edu/images/default/sample.pdf";
        //this.doc="http://localhost:5002/CSharpTeam.docx";
        this.themeService.theme.subscribe((val: string) => {
            //debugger;
            this.theme = val;
        });
        debugger;
        let res = await this.docviewerservice.getdmsfoldersList();
        debugger;
        if ((res as any).length == 0) {

            return;
        }
        this.items = this.convert(res);

    }
    ngAfterViewInit() {


    }

    // on menu click event
    async onMenuClick(e: any) {
        debugger;
        let label = e.item.label;
        
        
        this.currentfolder = e.item.fullpath;

        this.sessionService.setItem("active-doc", label);

        let url;
        let filekey = e.item.filekey;
        filekey = filekey.replace(/"/g, '');
        url = await this.geturl(filekey, e.item.contenttype);
        this.contenttype = e.item.contenttype;
        this.doctype = e.item.type;
        //this.doc=url;
        //this.cleanURL=this.sanitizer.bypassSecurityTrustResourceUrl(url);
        //this.doc="http://localhost:5002/"+label;
        //this.cleanURL=this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:5002/"+label);
        //this.images=[];
        //this.images.push("http://localhost:5002/"+label);
        //this.images.push(url);

        if (this.doctype == "ppt") this.doc = "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx";

    }
    /*    async geturl1(filename: string,filetype: string) {
            debugger;
             
             let ret= await fetch(AppConstants.AttachmentURL + filename)
             .then((res:any) => {
                 console.log(res);
                 res.blob()
             }) // Gets the response and returns it as a blob
             .then(blob =>{
                console.log(blob);
                JSZip.loadAsync(blob).then(function (zip) {
                     console.log(zip.files);
                     var url;//  = this.createObjectURL(zip.files[0]);
                     let file=zip.files;
                     Object.keys(zip.files).forEach( (filename) => {
                         
                         zip.file(filename).async('blob').then( (blob) => {
                             var file = new Blob([blob], {
                                 type: filetype
                               });
                             url= window.URL.createObjectURL( file );//blob
                             return(url);
                         });  
                       });
                         //url= window.URL.createObjectURL( file._data );
                     
                 //window.open(url);
                     // folder1/
                     // folder1/folder2/
                     // folder1/folder2/folder3/
                     // folder1/folder2/folder3/file1.txt
                 });
                 
             });
             return ret;
             //return AppConstants.AttachmentURL + filename;
         }
    */
    async geturl(filename: string, filetype: string) {
        debugger;

        let ret = await fetch(AppConstants.AttachmentURL + filename)
            .then((res:any) => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                JSZip.loadAsync(blob).then((zip) => {
                    console.log(zip.files);
                    var url;//  = this.createObjectURL(zip.files[0]);
                    let file = zip.files;
                    Object.keys(zip.files).forEach((filename) => {



                        let url = zip.file(filename).async('blob').then((blob) => {

                            var file = new Blob([blob], {
                                type: filetype
                            });

                            url = window.URL.createObjectURL(blob);//blob
                            console.log(url);

                            this.cleanURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                            
                            this.images = [];
                            this.images.push(url);
                            this.blob= blob;

                            this.doc = url;



                            return url;
                        });



                    });
                    //url= window.URL.createObjectURL( file._data );

                    //window.open(url);
                    // folder1/
                    // folder1/folder2/
                    // folder1/folder2/folder3/
                    // folder1/folder2/folder3/file1.txt
                });

            });
        return ret;
        //return AppConstants.AttachmentURL + filename;
    }
    onFolderClick(e: any) {
        debugger;
        let label = e.item.label;
        this.doctype = e.item.type;
        this.contenttype = e.item.contenttype;
        this.currentfolder = e.item.fullpath;


    }

    async onsearch() {
        debugger;
        this.action = "search";
        let search = this.dmsviewerForm.get('search').value;
        this.searchresults = await this.docviewerservice.searchdmsfolders(search);
        console.log(this.searchresults);
    }
    showfolder() {
        this.action = "";
    }
    // toggle sub menu on click
    toggleSubMenu(menu: MenuItem) {
        //   menu.IsChildVisible = !menu.IsChildVisible;
    }
    convert(array) {
        //  //debugger;
        var map = {};
        for (var i = 0; i < array.length; i++) {
            var obj: MenuItem;
            obj = new MenuItem();
            obj.id = array[i].id;
            obj.menucode = array[i].name.replace(new RegExp('"', 'g'), "");
            obj.label = array[i].name.replace(new RegExp('"', 'g'), "");

            obj.icon = array[i].iconname;
            obj.type = array[i].type;
            obj.contenttype = array[i].contenttype;
            obj.fullpath = array[i].fullpath;
            obj.filekey = array[i].filekey;
            let label = obj.label;

            if (array[i].iconname == "file")
                obj.command = (label) => this.onMenuClick(label);
            else
                obj.command = (label) => this.onFolderClick(label);
            //let link = array[i].menuurl;


            //obj.routerLink = link;
            //obj.command = (e:any) => { this.OpenPage(e); };

            map[obj.id] = obj;


            var parent = array[i].parentid || '-';
            if (!map[parent]) {
                map[parent] = {
                    items: []
                };
            }
            if (map[parent].items == undefined || map[parent].items == null) {

                map[parent].items = [];
            }
            else {
                // map[parent].icon = 'pi pi-fw';  //
            }

            map[parent].items.push(obj);
        }
        // //debugger;
        return map['f0'].items;

    }
}
