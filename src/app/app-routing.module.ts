import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchComponent } from './sales/product/watch/watch.component';
import { HomeComponent } from './sales/home/home.component';

const routes: Routes = [
  { path: 'products', component: WatchComponent },
  { path: 'home', component: HomeComponent , data: { title: 'Home' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
