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
  example: any;

  configs: { [key: string]: any } = {};
  inputs: { [key: string]: any } = {};

  ngOnInit(): void {

    this.example = (123456.123).toLocaleString(this.locale);
  }

  @Input() locale: string;


  constructor() {


  }

  setConfigs(k: string, v: any) {
    this.configs[k] = v;

  }

  parseResult(v: any) {
    return parseFloat(v);
  }
}
