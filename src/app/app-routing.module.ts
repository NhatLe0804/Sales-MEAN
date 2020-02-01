import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchComponent } from './sales/product/watch/watch.component';
import { HomeComponent } from './sales/home/home.component';
import { DetailComponent } from './sales/product/detail/detail.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { BlogComponent } from './shared/blog/blog.component';
import { AboutComponent } from './shared/about/about.component';
import { ContactComponent } from './shared/contact/contact.component';
const routes: Routes = [
  { path: 'products', component: WatchComponent },
  { path: 'product/:id', component: DetailComponent },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: PagenotfoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
