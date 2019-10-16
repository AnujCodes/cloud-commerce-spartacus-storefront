import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import {
  PaymentType,
  CheckoutPaymentAdapter,
  CheckoutPaymentConnector,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CheckoutActions } from '../actions/index';
import { PaymentTypesEffects } from './payment-types.effect';

const mockPaymentTypes: PaymentType[] = [
  {
    code: 'card',
    displayName: 'card',
  },
  {
    code: 'account',
    displayName: 'accoun',
  },
];

describe('Payment Types effect', () => {
  let service: CheckoutPaymentConnector;
  let effect: PaymentTypesEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentTypesEffects,
        { provide: CheckoutPaymentAdapter, useValue: {} },
        provideMockActions(() => actions$),
      ],
    });

    effect = TestBed.get(PaymentTypesEffects as Type<PaymentTypesEffects>);
    service = TestBed.get(CheckoutPaymentConnector as Type<
      CheckoutPaymentConnector
    >);

    spyOn(service, 'getPaymentTypes').and.returnValue(of(mockPaymentTypes));
  });

  describe('loadPaymentTypes$', () => {
    it('should load the payment types', () => {
      const action = new CheckoutActions.LoadPaymentTypes();
      const completion = new CheckoutActions.LoadPaymentTypesSuccess(
        mockPaymentTypes
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effect.loadPaymentTypes$).toBeObservable(expected);
    });
  });

  describe('setPaymentType$', () => {
    it('should set the payment type to cart', () => {
      // should implement after API is ready
    });
  });
});
