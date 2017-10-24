import {Component, Input, OnInit} from '@angular/core';

class InputEvent extends Event {
  data: any;
  inputType: string;
}

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  @Input() locale: string;
  @Input() dot: string;


  numbers = [
    // 10,
    // 11,
    // 167,
    // 1456,
    // 12345678,
    // 12.456,
    // 12.4567,
    // 67.345,
    // 0.6578,
    13123123.123
  ];

  constructor() {
  }

  ngOnInit() {
  }


  handleInputValue(event: InputEvent) {
    let oldVal = event.srcElement.getAttribute('oldValue');
    if (oldVal === null) {
      oldVal = '';
    }

    const input = <HTMLInputElement>event.srcElement;


    let inputValue = event.data;

    console.error(inputValue, event);

    if (inputValue && inputValue.length > 0) {
      if (inputValue === '.' || inputValue === ',') {
        inputValue = this.dot;
      }

      if (oldVal === '-' && inputValue === this.dot) {
        inputValue = '0' + inputValue;
      } else if (oldVal.length === 0 && inputValue === '-') {
        inputValue = inputValue;
      } else if (oldVal.length === 0 && inputValue === this.dot) {
        inputValue = '0' + inputValue;
      } else if (parseInt(inputValue, 10).toString().length === inputValue.toString().length) {
        inputValue = inputValue;
      } else if (inputValue === this.dot) {
        inputValue = this.dot;
      } else {
        inputValue = '';
      }

      let val = oldVal;

      if (inputValue === this.dot && (oldVal.search(/\./) >= 0 || oldVal.search(/,/) >= 0)) {
        val = oldVal;
      } else {
        val = oldVal.toString() + inputValue.toString();
      }

      input.value = val;

      event.srcElement.setAttribute('oldValue', val);
    } else {
      event.srcElement.setAttribute('oldValue', input.value);
    }


  }
}
