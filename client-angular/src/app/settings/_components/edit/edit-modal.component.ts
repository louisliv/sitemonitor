import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Setting } from "src/app/models/setting.model";

@Component({
  selector: 'setting-edit-modal',
  templateUrl: './edit-modal.component.html',
})
export class SettingEditModal implements OnInit {
  @Input() setting: Setting;
  @Input() action: string;
  @Input() types: string[];
  @Input() actionFn: (setting: Setting) => void;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }
  
  submit() {
    this.actionFn(this.setting);
  }
}