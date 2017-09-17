import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  searchterm: string;
  searchstate = 'empty';
  patients: string[] = [];
  patientName: string;
  patientId: string;
  newPatientId: any;

  recordsObservable: FirebaseListObservable<any[]>;
  reportObservable: FirebaseListObservable<any[]>;
  records: any;
  report: any;
  patientsArray: FirebaseObjectObservable<any[]>;

  constructor(public db: AngularFireDatabase, private modalService: BsModalService) {
    this.recordsObservable = db.list('/patients');
    this.reportObservable = db.list('/patients/0019203847528');
    this.patientsArray = db.object('patients/0019203847528/records/1');
  }

  ngOnInit() {
    this.recordsObservable.subscribe((response) => {
      this.records = response;
      this.records.forEach((record) => {
        this.patients.push(record.patientData.firstName);
      });
    });

    this.reportObservable.subscribe((response) => {
      this.report = response;
      console.log('Repoooort:', this.report[1][1]);
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
          this.patientName = patient;
        }
      })
    }
  }

  addRecordP() {
    this.closeReportForm();
    this.patientsArray.set(
      {
        category: 'control',
        data: {
          bloodpressure: '90',
          breath: '',
          diagnosis: 'The patient came with moderate belly pain and slightly raises temperature. ' +
          'According to related insomnia, setting up 3 days of medication with antihistaminics and sleep pills. ' +
          'HackTheNorth is cool btw ;)',
          extSymptoms: 'none',
          intSymptoms: 'belly pain',
          pulse: '120/70'
        },
        date: '12/06/2016',
        name: 'Belly Pain Control',
        place: 'GP / High Street', time: '12:34'
      }
    );
  }

  addPatient() {
    document.getElementById('add-patient').style.display = 'block';
    document.getElementById('patient-content').style.display = 'none';
  }

  closeAddPatient() {
    document.getElementById('add-patient').style.display = 'none';
    document.getElementById('patient-content').style.display = 'block';
    this.newPatientId = '';
  }

  postPatient() {
    const patientsArray = this.db.list('/patients/' + this.newPatientId);
    patientsArray.push({patientData: '', records: ''});
    this.closeAddPatient();
  }

  closeReport() {
    document.getElementById('patient-content').style.display = 'block';
    document.getElementById('report').style.display = 'none';
  }


  closeReportForm() {
    document.getElementById('patient-content').style.display = 'block';
    document.getElementById('reportform').style.display = 'none';
  }
}
