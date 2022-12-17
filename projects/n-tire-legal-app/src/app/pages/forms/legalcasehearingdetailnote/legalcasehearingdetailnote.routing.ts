import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { legalcasehearingdetailnoteComponent } from './legalcasehearingdetailnote.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'legalcasehearingdetailnotes',children: [
{ path: '', component: legalcasehearingdetailnoteComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: legalcasehearingdetailnoteComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'view/:viewid', component: legalcasehearingdetailnoteComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id/source/:sourcekey/:sourceid', component: legalcasehearingdetailnoteComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
