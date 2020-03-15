import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {TrucksDataService} from '../shared/services/trucks-data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SnackBarService} from '../shared/services/snack-bar.service';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss']
})
export class AddTruckComponent implements OnInit {
  addAssetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private truckData: TrucksDataService,
    private modalService: NgbModal,
    private snackBar: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.addAssetForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90), Validators.pattern('^[-+]?\\d*\\.?\\d*$')]],
        longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180), Validators.pattern('^[-+]?\\d*\\.?\\d*$')]],
      },
      {
        validator: this.isExists('name')
      }
    );
  }

  get form() {
    return this.addAssetForm.controls;
  }

  addAsset() {
    this.truckData.addItem({
      id: this.truckData.truckList.length + 1,
      name: this.addAssetForm.controls.name.value,
      lat: this.addAssetForm.controls.latitude.value,
      lon: this.addAssetForm.controls.longitude.value,
    });
    this.addAssetForm.reset();
    this.modalService.dismissAll();
    this.snackBar.show('Truck successfully added', 'success');
  }

  openModal(content) {
    this.modalService.open(content);
  }

  isExists(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const truckList = this.truckData.truckList;

      truckList.map(item => {
        if (item.name === control.value) { control.setErrors({ isExists: true }); }
      });
    };
  }
}
