import { Component } from '@angular/core';

@Component({
  selector: 'bt-root',
  templateUrl: `./app.component.html`,
  styles: [],
})
export class AppComponent {

  isLoggedIn() {
    if (localStorage.getItem('bbt-token')) {
      return true;
    }
    else {
      return false;
    }
  }
  
}
