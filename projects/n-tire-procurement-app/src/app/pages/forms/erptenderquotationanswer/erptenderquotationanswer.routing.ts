import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptenderquotationanswerComponent } from './erptenderquotationanswer.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptenderquotationanswers',children: [
{ path: '', component: erptenderquotationanswerComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptenderquotationanswerComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
