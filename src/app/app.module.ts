import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './firebaseConfig.constant';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';
import { MainConfigService } from './services/main-config.service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigComponent } from './config/config.component';
import { EditCreatePromoComponent } from './edit-create-promo/edit-create-promo.component';
import { PromosService } from './services/promos.service';
import { PromoConfigItemComponent } from './promo-config-item/promo-config-item.component';
import { EditCreateProductComponent } from './edit-create-product/edit-create-product.component';
import { ProductConfigItemComponent } from './product-config-item/product-config-item.component';
import { PromoCarouselComponent } from './promo-carousel/promo-carousel.component';
import { FiltersComponent } from './filters/filters.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MainConfigComponent } from './main-config/main-config.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { EmailsSenderService } from './services/email-sender.service';
import { HttpModule } from '@angular/http';
import { IsLoggedInGuard } from './is-logged-in.guard';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    DashboardComponent,
    ConfigComponent,
    EditCreatePromoComponent,
    PromoConfigItemComponent,
    EditCreateProductComponent,
    ProductConfigItemComponent,
    PromoCarouselComponent,
    FiltersComponent,
    ProductItemComponent,
    MainConfigComponent,
    DetailsComponent,
    CartComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    Angular2FontawesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    LocalStorageModule.withConfig({
      prefix: 'commerce',
      storageType: 'localStorage'
    }),
    ColorPickerModule
  ],
  providers: [
    AuthService,
    ProductsService,
    PromosService,
    EmailsSenderService,
    MainConfigService,
    IsLoggedInGuard
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*
<!-- Component -->
<fa [name]=string      // name of fontawesome icon
    [size]=number      // [1-5]
    [flip]=string      // [horizontal|vertical]
    [pull]=string      // [right|left]
    [rotate]=number    // [90|180|270]
    [border]=boolean   // [true|false]
    [spin]=boolean     // [true|false]
    [fw]=boolean       // [true|false]
    [inverse]=boolean  // [true|false]
    ></fa>
*/
