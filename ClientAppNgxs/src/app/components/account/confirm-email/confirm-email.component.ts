import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmEmailModel } from '../models/confirm-email.model';
import { ConfirmEmail } from '../store/actions/confirm-email.action';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  email: string;
  code: string;

  constructor(
    private store$: Store,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
      this.code = params.code;
    });
    this.confirmEmail();
  }

  confirmEmail() {
    let model: ConfirmEmailModel = {
      email: this.email,
      code: this.code
    };

    return this.store$.dispatch(new ConfirmEmail(model));
  }

}
