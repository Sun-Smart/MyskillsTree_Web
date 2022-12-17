import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmsownerkycdetailComponent } from './pmsownerkycdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmsownerkycdetails',children: [
{ path: '', component: pmsownerkycdetailComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmsownerkycdetailComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
