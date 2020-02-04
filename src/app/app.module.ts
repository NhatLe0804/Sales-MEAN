import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WatchComponent } from './sales/product/watch/watch.component';
import { HomeComponent } from './sales/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from './shared/banner/banner.component';
import { DetailComponent } from './sales/product/detail/detail.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BlogComponent } from './shared/blog/blog.component';
import { AboutComponent } from './shared/about/about.component';
import { ContactComponent } from './shared/contact/contact.component';
import { CustomHttpInterceptorService } from './services/http-interceptor.service';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#21d2ca',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsOpacity: 0,
  overlayColor: '',
  // bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  minTime: 500
};
@NgModule({
  declarations: [
    AppComponent,
    WatchComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    DetailComponent,
    PagenotfoundComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    NgbModule,
    SlickCarouselModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
