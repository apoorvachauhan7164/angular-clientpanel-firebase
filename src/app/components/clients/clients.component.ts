import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[];
  keys: any[];
  totalOwed: number;
  unknownData: any[];

  constructor(public clientService: ClientService) {
   }

  ngOnInit() {
    // In order to fetch the data without keys from firebase db.
    this.clientService.getClients().valueChanges().subscribe(clients => {
      // this.clients = clients;
    });

    // In order to get the keys from firebase db.
    this.clientService.getClients().snapshotChanges().pipe(
      map(actions => actions.map(a => ({key: a.key, ...a.payload.val()})))
      ).subscribe(clients => {
      this.clients = clients;
      // Get the total balance using getTotal funtion.
      this.getTotal();
    });
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.clients.length; i++) {
      total += parseFloat(this.clients[i].balance);
    }
    this.totalOwed = total;
    console.log(this.totalOwed);
  }

}
