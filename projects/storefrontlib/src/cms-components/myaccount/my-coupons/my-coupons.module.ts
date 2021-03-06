import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  I18nModule,
  ConfigModule,
  CmsConfig,
  AuthGuard,
  UrlModule,
} from '@spartacus/core';
import { CardModule } from '../../../shared/components/card/card.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { MyCouponsComponent } from './my-coupons.component';
import { CouponCardComponent } from './coupon-card/coupon-card.component';

import { ListNavigationModule } from '../../../shared/components/list-navigation/list-navigation.module';
import { CouponDialogComponent } from './coupon-card/coupon-dialog/coupon-dialog.component';
import { CouponClaimComponent } from './coupon-claim/coupon-claim.component';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { IconModule } from '../../misc/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    RouterModule,
    UrlModule,
    IconModule,
    ListNavigationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MyCouponsComponent: {
          component: MyCouponsComponent,
          guards: [AuthGuard],
        },
        CouponClaimComponent: {
          component: CouponClaimComponent,
          guards: [AuthGuard],
        },
      },
    }),
    RouterModule.forChild([
      {
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'couponClaim' },
      },
    ]),
  ],
  declarations: [
    MyCouponsComponent,
    CouponCardComponent,
    CouponDialogComponent,
    CouponClaimComponent,
  ],
  exports: [MyCouponsComponent, CouponClaimComponent],
  entryComponents: [
    MyCouponsComponent,
    CouponDialogComponent,
    CouponClaimComponent,
  ],
})
export class MyCouponsModule {}
