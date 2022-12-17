import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bodatamaskingrolerestrictComponent } from './bodatamaskingrolerestrict.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bodatamaskingrolerestricts',children: [
{ path: '', component: bodatamaskingrolerestrictComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bodatamaskingrolerestrictComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
