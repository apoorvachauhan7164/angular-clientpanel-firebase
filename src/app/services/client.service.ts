import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: AngularFireList<any>;
  client: AngularFireObject<any>;

  constructor(public db: AngularFireDatabase) {
    this.clients = this.db.list<Client>('/clients') as AngularFireList<Client[]>;
  }

  getClients() {
    return this.clients;
  }

  newClient(client: Client) {
    this.clients.push(client);
  }

  getClient(id: string) {
    this.client = this.db.object('/clients/' + id) as AngularFireObject<Client>;
    return this.client;
  }

  updateClient(id: string, client: Client) {
    return this.clients.update(id, client);
  }

  deleteClient(id: string) {
    return this.clients.remove(id);
  }
}
