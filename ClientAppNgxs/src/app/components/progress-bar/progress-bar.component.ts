import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProgressBarComponent>
  ) { }

  ngOnInit(): void {
  }

}
