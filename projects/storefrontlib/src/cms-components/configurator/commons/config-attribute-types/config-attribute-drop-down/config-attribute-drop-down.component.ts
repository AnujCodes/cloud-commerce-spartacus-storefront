import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-drop-down',
  templateUrl: './config-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeDropDownComponent implements OnInit {
  attributeDropDownForm = new FormControl('');

  constructor(public uiKeyGenerator: ConfigUIKeyGeneratorService) {}

  @Input() attribute: Configurator.Attribute;

  ngOnInit() {}

  onSelect(value: Configurator.Value) {
    console.log('DDLB selected value: ' + value);
  }
}
