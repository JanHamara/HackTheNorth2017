import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.less']
})
export class ProfileDataComponent implements OnInit {
  recordsObservable: FirebaseListObservable<any[]>;
  record: any;

  constructor(db: AngularFireDatabase) {
    this.recordsObservable = db.list('/patients/0019203847528');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.record = response;
    });
  }

  openReportForm() {
    document.getElementById('patient-content').style.display = 'none';
    document.getElementById('reportform').style.display = 'block';
  }


  closeAddPatient() {
    document.getElementById('add-patient').style.display = 'none';
    document.getElementById('patient-content').style.display = 'block';
  }

}
