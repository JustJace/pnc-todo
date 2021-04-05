import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { delay, filter, finalize, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public readonly auth: AuthService, private readonly _loading: LoadingController) { }

  ngOnInit(): void {
  
  }

  public async signInWithGoogle(): Promise<void> {
    const loading = await this._loading.create({
      message: 'Logging In'
    });
    await loading.present();
    await this.auth.signInWithGoogle();
    await loading.dismiss();
  }
}
