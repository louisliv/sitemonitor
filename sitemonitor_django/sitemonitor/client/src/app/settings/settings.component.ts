import { Component, OnInit } from '@angular/core';
import { faSpinner, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { SettingsApi } from './../api/api.settings';
import { Setting } from "./../models/setting.model";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SettingEditModal } from "./_components/edit/edit-modal.component";
import * as _ from "lodash";
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isLoaded = false;
  faSpinner = faSpinner;
  faTrash = faTrashAlt;
  faPencil = faPencilAlt;
  settings: Setting[];
  settingTypes: string[];
  page = 1;
  pageSize = 10;
  currentModal: NgbModalRef;

  constructor(
    private settingsApi: SettingsApi,
    private modalService: NgbModal,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.settingsApi.getAll().subscribe({
      next: data => {
        this.settings = data
        this.isLoaded = true;
      }
    });

    this.settingsApi.getTypes().subscribe({
      next: data => {
        this.settingTypes = data;
      }
    })
  }

  openAddModal() {
    var setting = new Setting();
    this.currentModal = this.modalService.open(SettingEditModal)
    
    this.currentModal.componentInstance.setting = setting;
    this.currentModal.componentInstance.action = 'Add';
    this.currentModal.componentInstance.types = this.settingTypes;
    this.currentModal.componentInstance.actionFn = this.add;
  }

  openEditModal(setting) {
    this.currentModal = this.modalService.open(SettingEditModal)
    
    this.currentModal.componentInstance.setting = {...setting};
    this.currentModal.componentInstance.action = 'Edit';
    this.currentModal.componentInstance.types = this.settingTypes;
    this.currentModal.componentInstance.actionFn = this.edit;
  }

  public add = (setting: Setting) => {
    this.settingsApi.create(setting).subscribe({
      next: result => {
        this.settings.push(result);
        this.currentModal.dismiss();
        this.toastService.show(
          'Setting stored successfully', 
          { classname: 'bg-success text-light' }
        )
      },
      error: err => {
        this.toastService.show(
          `${err.error.status}: ${err.error.message}`, 
          { classname: 'bg-danger text-light' }
        )
      }
    })
  }

  public edit = (setting: Setting) => {
    this.settingsApi.update(setting).subscribe({
      next: result => {
        var index =_.findIndex(this.settings, {id: result.id})

        this.settings[index] = result;

        this.currentModal.dismiss();

        this.toastService.show(
          'Setting stored successfully', 
          { classname: 'bg-success text-light' }
        )
      },
      error: err => {
        this.toastService.show(
          `${err.error.status}: ${err.error.message}`, 
          { classname: 'bg-danger text-light' }
        )
      }
    })
  }

  remove(setting: Setting) {
    this.settingsApi.destroy(setting).subscribe({
      next: result => {
        _.remove(this.settings, {id: setting.id});

        this.toastService.show(
          'Setting removed successfully', 
          { classname: 'bg-success text-light' }
        )
      },
      error: err => {
        this.toastService.show(
          `${err.error.status}: ${err.error.message}`, 
          { classname: 'bg-danger text-light' }
        )
      }
    })
  }

}
