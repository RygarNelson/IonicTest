import { Component, OnInit } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public version = '';

  constructor(private dialog: Dialogs, private appVersion: AppVersion) { }

  ngOnInit() {
    this.appVersion.getVersionNumber().then(
      (versionNumber) => {
        this.version = versionNumber;
      },
      (error) => {
        console.log(error);
      }
    );
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
