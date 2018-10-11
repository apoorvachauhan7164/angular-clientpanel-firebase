import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private flashMessagesServices: FlashMessagesService
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessagesServices.show('Settings Saved Successfully', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/settings']);
  }

}
