import {Component, Input, OnInit} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.less']
})
export class ProfileDataComponent implements OnInit {
  recordsObservable: FirebaseListObservable<any[]>;
  record: any;
  @Input() data;

  constructor(db: AngularFireDatabase) {
    this.recordsObservable = db.list('/patients/0019203847528');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.record = response;
    });
  }

}
