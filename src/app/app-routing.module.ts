import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { StoresComponent } from '../app/stores/stores.component';
// import { ItemsComponent } from '../app/items/items.component';
import { HomeComponent } from '../app/home/home.component';
import { ContactUsComponent } from '../app/contactus/contactus.component';

const routes: Routes = [
// { path: 'stores', component: StoresComponent },
// { path: 'items', component: ItemsComponent },
{ path: 'home', component: HomeComponent },
{ path: 'contactus', component: ContactUsComponent },
{
  path: 'features-modules',
  loadChildren: () => import('../app/features-modules/features-modules.module').then(m => m.FeaturesModulesModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
