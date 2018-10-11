import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];

    // Get Client
    this.clientService.getClient(this.id).snapshotChanges().subscribe(action => {
      this.client = {$key: action.key, ...action.payload.val()};
      if (!this.client.$key) {
        console.log('No such client info with this ID');
      }
    });

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      console.log('Data Not validated');
      this.flashMessagesService.show('Please fill in all the fields', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['edit-client/' + this.id]);
    } else {
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client Updated Successfully', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/client/' + this.id]);
    }
  }

}
