import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { bosecurityquestionComponent } from './bosecurityquestion.component';
import { CanDeactivateGuard } from '../../common/unsaved-changes';
const routes: Routes = [
{
                        path: 'bosecurityquestions',children: [
{ path: '', component: bosecurityquestionComponent, canDeactivate: [CanDeactivateGuard] },
{ path: 'edit/:id', component: bosecurityquestionComponent, canDeactivate: [CanDeactivateGuard] }
]} 
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
