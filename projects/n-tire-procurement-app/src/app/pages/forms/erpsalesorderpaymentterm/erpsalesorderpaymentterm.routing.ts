import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erpsalesorderpaymenttermComponent } from './erpsalesorderpaymentterm.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erpsalesorderpaymentterms',children: [
{ path: '', component: erpsalesorderpaymenttermComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erpsalesorderpaymenttermComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
