import { Component, OnInit } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private dialog: Dialogs) { }

  ngOnInit() {
  }

  callDialog() {
    this.dialog.alert('Henlo World!').then(
      () => {
        console.log('Dialog dismissed');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
