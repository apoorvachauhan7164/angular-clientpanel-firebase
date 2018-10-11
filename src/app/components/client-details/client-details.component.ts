import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
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
      if (this.client.balance > 0) {
        this.hasBalance = true;
      }
    });
  }

  updateBalance() {
    // Update client
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance Updated Successfully', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/client/' + this.id]);
  }

  onDelete() {
    if (confirm('Want to delete this item?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted Successfully', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/']);
    }
  }
}
