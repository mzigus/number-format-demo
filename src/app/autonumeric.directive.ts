import {Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import AutoNumeric from 'autonumeric/src/main.js';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[autonumeric]'
})
export class AutonumericDirective implements OnInit {
  @Input() allowDecimalPadding: boolean = false;
  @Input() locale: string;
  @Input() minValue: number = null;
  @Input() maxValue: number = null;
  @Input() isThousandSeparator = false;
  @Input() decimalPlaces = 0;

  @Output() exportConfig: EventEmitter<any> = new EventEmitter(null);
  @Output() rawValue: EventEmitter<number> = new EventEmitter(null);

  decimalSeparator() {
    const separator = (1.1).toLocaleString(this.locale).substring(1, 2);
    switch (separator) {
      case '’':
        return '\'';
      default:
        return separator;
    }
  }

  thousandSeparator() {
    const separator = (1000).toLocaleString(this.locale).substring(1, 2);
    switch (separator) {
      case '’':
        return '\'';
      default:
        return separator;
    }
  }


  constructor(private element: ElementRef) {

  }

  ngOnInit(): void {
    const config: { [key: string]: any } = {};
    if (this.minValue) {
      config['minimumValue'] = this.minValue;
    }
    if (this.maxValue) {
      config['maximumValue'] = this.maxValue;
    }
    if (this.isThousandSeparator) {
      config['digitGroupSeparator'] = this.thousandSeparator();
    } else {
      config['digitGroupSeparator'] = '';
    }
    config['decimalCharacter'] = this.decimalSeparator();

    config['decimalPlaces'] = this.decimalPlaces;

    if (this.allowDecimalPadding) {
      config['allowDecimalPadding'] = this.allowDecimalPadding;
    }
    this.exportConfig.emit(config);

    const field = new AutoNumeric(this.element.nativeElement, config);


    Observable.fromEvent(this.element.nativeElement, 'input').subscribe(() => {
      this.rawValue.emit(field.rawValue);
    });
  }

}
