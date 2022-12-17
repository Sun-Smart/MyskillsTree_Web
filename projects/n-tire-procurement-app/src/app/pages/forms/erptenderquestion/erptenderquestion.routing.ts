import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { erptenderquestionComponent } from './erptenderquestion.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
{
                        path: 'erptenderquestions',children: [
{ path: '', component: erptenderquestionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: erptenderquestionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
