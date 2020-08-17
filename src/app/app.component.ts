import { Component } from '@angular/core';
import uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fabrikaUsability';
  userId: string;

  constructor() {
    (!sessionStorage.getItem('user-id') || sessionStorage.getItem('user-id') == '' || sessionStorage.getItem('user-id') == null) ? this.userId = uuid.v4() : this.userId = sessionStorage.getItem('user-id');
  }

  ngOnInit() {
    console.log('Created app...');
    console.log('Set session...')
		if(!sessionStorage.getItem('user-id') || sessionStorage.getItem('user-id') == '' || sessionStorage.getItem('user-id') == null) sessionStorage.setItem('user-id', this.userId);
		else return;
	}
}
