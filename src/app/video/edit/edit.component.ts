import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;

  clipID = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  showAlert = false;
  alertMsg = 'Please wait! Your updating clip.';
  alertColor = 'blue';
  inSubmissions = false;

  @Output() update = new EventEmitter();

  editForm = new FormGroup({
    clipID: this.clipID,
    title: this.title,
  });

  constructor(private modal: ModalService, private clipService: ClipService) {}

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }

    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);

    this.showAlert = false;
    this.inSubmissions = false;
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }
    
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your updating clip.';
    this.alertColor = 'blue';
    this.inSubmissions = true;

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
    } catch (error) {
      this.alertMsg = 'Something went wrong! Try again late.';
      this.alertColor = 'red';
      this.inSubmissions = false;

      return;
    }

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmissions = false;
    this.alertMsg = 'Success!';
    this.alertColor = 'green';
  }
}
