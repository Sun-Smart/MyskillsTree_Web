import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BOReportViewerComponent } from './boreportviewer.component';
import { boformviewerComponent } from './boformviewer.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [

  { path: '', component: BOReportViewerComponent },
  { path: 'view/:id/:pk', component: boformviewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: '/:id', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: '/:id', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'edit/:id', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] }

];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
