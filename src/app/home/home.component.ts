import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `
    <div class="ui container">
      <h1>Home</h1>
      <p>Impfanmeldepage</p>
      <a routerLink="../vaccinations" class="ui red button">
        Impftermine ansehen
      </a>
    </div>

  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
