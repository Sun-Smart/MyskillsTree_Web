import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule} from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpregisteredsupplierproductcategory.routing';
import { erpregisteredsupplierproductcategoryComponent } from './erpregisteredsupplierproductcategory.component';
                    @NgModule({
                        exports:[
                          NgCommonModule
                        ],  
imports: [boreportviewerModule,
    routing,
    NgCommonModule
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
declarations: [erpregisteredsupplierproductcategoryComponent]
                        })
export class erpregisteredsupplierproductcategoryModule { }
