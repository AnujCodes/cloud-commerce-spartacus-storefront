import { Component, EventEmitter, Input, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CartService, I18nTestingModule, Voucher, Cart } from '@spartacus/core';
import { of } from 'rxjs';
import { CartCouponAnchorService } from './cart-coupon-anchor/cart-coupon-anchor.service';
import { CartCouponComponent } from './cart-coupon.component';
import { ICON_TYPE } from '@spartacus/storefront';


@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-applied-coupons',
  template: '',
})
export class MockAppliedCouponsComponent {
  @Input()
  vouchers: Voucher[];
  @Input()
  cartIsLoading = false;
  @Input()
  isReadOnly = false;
}

describe('CartCouponComponent', () => {
  let component: CartCouponComponent;
  let fixture: ComponentFixture<CartCouponComponent>;
  let cartCouponAnchorService;
  let input: HTMLInputElement;
  let el: DebugElement;
  const emitter = new EventEmitter<string>();

  const mockCartService = jasmine.createSpyObj('CartService', [
    'getActive',
    'addVoucher',
    'getAddVoucherResultSuccess',
    'resetAddVoucherProcessingState',
    'getAddVoucherResultLoading',
    'getLoaded',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [
        CartCouponComponent,
        MockAppliedCouponsComponent,
        MockCxIconComponent,
      ],
      providers: [
        { provide: CartService, useValue: mockCartService },
        CartCouponAnchorService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    cartCouponAnchorService = TestBed.get(CartCouponAnchorService);
    spyOn(cartCouponAnchorService, 'getEventEmit').and.returnValue(emitter);

    mockCartService.getActive.and.returnValue(of<Cart>({ code: '123' }));
    mockCartService.getLoaded.and.returnValue(of(true));
    mockCartService.getAddVoucherResultSuccess.and.returnValue(of());
    mockCartService.getAddVoucherResultLoading.and.returnValue(of());
    mockCartService.addVoucher.and.stub();
    mockCartService.resetAddVoucherProcessingState.and.stub();
    mockCartService.resetAddVoucherProcessingState.calls.reset();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show coupon input and submit buttom', () => {
    fixture.detectChanges();
    expect(el.query(By.css('[data-test="title-coupon"]'))).toBeTruthy();
    expect(el.query(By.css('[data-test="input-coupon"]'))).toBeTruthy();
    expect(el.query(By.css('[data-test="button-coupon"]'))).toBeTruthy();
    expect(
      el.query(By.css('[data-test="button-coupon"]')).nativeElement.disabled
    ).toBeTruthy();
  });

  it('should disable button when cart is loading', () => {
    mockCartService.getAddVoucherResultLoading.and.returnValue(of(true));
    fixture.detectChanges();

    input = el.query(By.css('[data-test="input-coupon"]')).nativeElement;
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    el.query(By.css('[data-test="button-coupon"]')).nativeElement.click();

    expect(
      el.query(By.css('[data-test="button-coupon"]')).nativeElement.disabled
    ).toBeTruthy();
  });

  it('should apply coupon', () => {
    mockCartService.getAddVoucherResultLoading.and.returnValue(of(true));
    mockCartService.getAddVoucherResultSuccess.and.returnValue(of(true));

    fixture.detectChanges();

    input = el.query(By.css('[data-test="input-coupon"]')).nativeElement;
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    el.query(By.css('[data-test="button-coupon"]')).nativeElement.click();

    expect(
      el.query(By.css('[data-test="button-coupon"]')).nativeElement.disabled
    ).toBeTruthy();
  });
});
