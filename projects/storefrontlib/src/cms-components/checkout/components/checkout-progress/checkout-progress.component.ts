import { RoutingService, RoutingConfigService } from '@spartacus/core';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
//import { CheckoutConfig } from '../../config/checkout-config';
import { CheckoutStep } from '../../model/checkout-step.model';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CheckoutConfigService } from '../../services/checkout-config.service';

@Component({
  selector: 'cx-checkout-progress',
  templateUrl: './checkout-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProgressComponent implements OnInit, OnDestroy {
  constructor(
    //protected config: CheckoutConfig,
    protected routingService: RoutingService,
    protected routingConfigService: RoutingConfigService,
    protected checkoutConfigService: CheckoutConfigService,
    private cdr: ChangeDetectorRef
  ) {}

  steps: CheckoutStep[];
  routerState$: Observable<any>;
  activeStepIndex: number;
  activeStepUrl: string;

  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.checkoutConfigService.steps$.subscribe(steps => {
      this.steps = steps;
      this.cdr.detectChanges();
    });

    this.routerState$ = this.routingService.getRouterState().pipe(
      tap(router => {
        this.activeStepUrl = router.state.context.id;

        this.steps.forEach((step, index) => {
          const routeUrl = `/${
            this.routingConfigService.getRouteConfig(step.routeName).paths[0]
          }`;
          if (routeUrl === this.activeStepUrl) {
            this.activeStepIndex = index;
          }
        });
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
