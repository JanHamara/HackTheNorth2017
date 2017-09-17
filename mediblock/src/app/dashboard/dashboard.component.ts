import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  searchterm: string;
  searchstate = 'empty';
  patients: String[] = [];

  recordsObservable: FirebaseListObservable<any[]>;
  records: any;

  constructor(db: AngularFireDatabase) {
    this.recordsObservable = db.list('/patients');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
      this.records.forEach((record) => {
        this.patients.push(record.patientData.firstName);
        this.patients.push(record.patientData.secondName);
      });
    });
  }
  search() {
    if (this.searchterm == null) {
      this.searchstate = 'empty';
      console.log('Input is empty');
    } else {
      this.searchstate = 'searching';
      console.log('searching');
      this.patients.forEach((patient) => {
        if (patient === this.searchterm) {
          this.searchstate = 'found';
        }
      })
    }
  }

}
