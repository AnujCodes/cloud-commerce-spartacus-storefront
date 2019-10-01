import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit, OnDestroy {
  configuration$: Observable<Configurator.Configuration>;
  subscription = new Subscription();
  productCode: string;
  public UiType = Configurator.UiType;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe(state => this.createConfiguration(state))
    );
  }

  createConfiguration(routingData) {
    this.productCode = routingData.state.params.rootProduct;
    this.configuration$ = this.configuratorCommonsService.createConfiguration(
      routingData.state.params.rootProduct
    );
  }

  updateConfiguration(changedAttribute) {
    this.configuration$
      .subscribe(configuration => {
        //Make new configuration object as state configuration cannot be changed
        let changedConfiguration: Configurator.Configuration = {
          productCode: this.productCode,
          consistent: configuration.consistent,
          configId: configuration.configId,
          complete: configuration.complete,
          attributes: configuration.attributes.filter(
            attribute => attribute.name !== changedAttribute.name
          ),
        };
        changedConfiguration.attributes.push(changedAttribute);

        this.configuration$ = this.configuratorCommonsService.updateConfiguration(
          changedConfiguration
        );
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
