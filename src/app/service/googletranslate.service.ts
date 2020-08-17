import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleObj } from '../models/solution';

@Injectable({
  providedIn: 'root'
})

export class GoogletranslateService {

  // url = 'https://translation.googleapis.com/language/translate/v2?key=';
  url = 'https://translation.googleapis.com/v3/projects/626721521178:translateText?key=';
  key = 'AIzaSyAy1blNhDgeyEaR9NQF4IyhQlSsAUuCr78';

  constructor(private http: HttpClient) { }

  translate(obj: GoogleObj) {
    return this.http.post(this.url + this.key, obj);
  }

}
