import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dmsdocumentfieldComponent } from './dmsdocumentfield.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'dmsdocumentfields',children: [
{ path: '', component: dmsdocumentfieldComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: dmsdocumentfieldComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
