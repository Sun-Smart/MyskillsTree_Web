import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmsuploadComponent } from './dmsupload.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmsuploads',children: [
{ path: '', component: dmsuploadComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmsuploadComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
