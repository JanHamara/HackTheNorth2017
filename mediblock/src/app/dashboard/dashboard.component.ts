import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnChanges {
  searchterm: string;
  searchstate = 'empty';

  recordsObservable: FirebaseListObservable<any[]>;
  records: any;

  constructor(db: AngularFireDatabase) {
    this.recordsObservable = db.list('/patients');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
      console.log('Data: ', this.records);
    });
  }

  ngOnChanges() {
    if (this.searchterm == null) {
      this.searchstate = 'empty';
    } else {

    }
  }

}
