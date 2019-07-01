import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, CartService, Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartCouponAnchorService } from './cart-coupon-anchor/cart-coupon-anchor.service';

@Component({
  selector: 'cx-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class CartCouponComponent implements OnInit, OnDestroy {
  form: FormGroup;
  btnEnabled: boolean;
  addVoucherIsLoading$: Observable<boolean>;

  @Input()
  cart: Cart | Order;
  @Input()
  cartIsLoading = false;

  private subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private element: ElementRef,
    private cartCouponAnchorService: CartCouponAnchorService
  ) {}

  ngOnInit() {
    this.cartService.resetAddVoucherProcessingState();

    this.form = this.formBuilder.group({
      couponCode: ['', [Validators.required]],
    });

    this.addVoucherIsLoading$ = this.cartService.getAddVoucherResultLoading();

    this.subscription.add(
      this.cartService.getAddVoucherResultSuccess().subscribe(success => {
        this.onSuccess(success);
      })
    );

    this.subscription
      .add(
        this.cartCouponAnchorService
          .getEventEmit()
          .subscribe((anchor: string) => {
            this.scrollToView(anchor);
          })
      )
      .add(
        this.form.valueChanges.subscribe(
          () => (this.btnEnabled = this.form.valid)
        )
      );
  }

  scrollToView(anchor: string) {
    const anchorElement = this.element.nativeElement.querySelector(anchor);
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSuccess(success: boolean) {
    if (success) {
      this.form.reset();
      this.cartService.resetAddVoucherProcessingState();
    }
  }

  applyVoucher(): void {
    this.cartService.addVoucher(this.form.value.couponCode);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.cartService.resetAddVoucherProcessingState();
  }
}
