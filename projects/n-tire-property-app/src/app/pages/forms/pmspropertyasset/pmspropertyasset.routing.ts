import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pmspropertyassetComponent } from './pmspropertyasset.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'pmspropertyassets',children: [
{ path: '', component: pmspropertyassetComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: pmspropertyassetComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
