import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../service/data.service";
import uuid from 'uuid';

import { SolutionService } from '../service/solution.service';
import { Solution, GoogleObj } from '../models/solution';
import { GoogletranslateService } from '../service/googletranslate.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showUploadBtn: boolean;
	translations: Array<any>;
	languages: Array<any>;
  translation: any;

  responseLanguages: any;
  azureLanguages: any;

  
  constructor(private http: HttpClient, private data: DataService, private solution: SolutionService, private google: GoogletranslateService) {
    
    this.translations = [];
		this.translation = {
			translation_name: '',
			initial_text: '',
			initial_lang: '',
			translation_text: '',
			translation_lang: ''
		};
    this.showUploadBtn = true;
   }

  ngOnInit(): void {
    console.log('Created main component...');
    localStorage.getItem('user-translation') ? this.translations = JSON.parse(localStorage.getItem('user-translation')) : this.translations = [];
    
    // get selected translation from archive
    this.data.currentTranslation.subscribe(item => this.translation = item);

    // hide upload button to avoid uploading same translation
    (Object.keys(this.translation).length > 0) ? this.showUploadBtn = false : this.showUploadBtn = true;

    // test solution for google api
    // this.solution.getSolution().subscribe(res => this.solData = res);
    // console.log(this.solData);
    
    // get languages
    this.getLanguages();
  }

  public clearForm() {
    this.translation = {};
    this.showUploadBtn = true;
  }

  public getLanguages() {
    this.http.get('https://api.cognitive.microsofttranslator.com/languages?api-version=3.0&scope=translation')
      .subscribe(response => {
        this.responseLanguages = response;
        this.azureLanguages = Object.keys(this.responseLanguages.translation)
        return response;
    });
  }

  public translateText(item){

    const headers = { 
      'Ocp-Apim-Subscription-Key': 'key1',
      'Ocp-Apim-Subscription-Region': 'westeurope',
      'Content-type': 'application/json',
      'X-ClientTraceId': uuid.v4().toString()
    }
    const body = [{
      'text': item.initial_text
    }]

    let url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to='+item.translation_lang+'&json=true';

    if(Object.keys(item).length < 3) {
      alert('Вы ввели не все данные');
    } else {
      this.http.post<any>(url, body, { headers }).subscribe(response => {
          if(response.length != 0) {
            response.forEach(r => {
              this.translation.initial_lang = r.detectedLanguage.language;
              this.translation.translation_text = r.translations[0].text;
            });
            this.translations.push(this.translation);
            localStorage.setItem('user-translation', JSON.stringify(this.translations));
            this.showUploadBtn = false;
          } else if (response.error.code != '') {
            alert('Ошибка обращения к серверу')
          }
      });
    }
 
  }

  // test google api
  // public testConnection2() {
  //   const googleObj: GoogleObj = {
  //     q: [this.solData.title, this.solData.description, this.solData.detail],
  //     target: this.translation.translation_lang
  //   };
  //   this.google.translate(googleObj).subscribe( (res: any) => {
  //       console.log(res.data.translations[0].translatedText)
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );

  //   this.google.translate(googleObj).subscribe(
  //     (res: any) => {
  //       this.solData = {
  //         title: res.data.translations[0].translatedText,
  //         description: res.data.translations[1].translatedText,
  //         detail: res.data.translations[2].translatedText
  //       };
  //       console.log(this.solData);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

}
