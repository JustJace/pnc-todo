import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public signedInUser$!: Observable<firebase.User | null>;

  constructor(private readonly _auth: AuthService) { }

  ngOnInit(): void {
    this.signedInUser$ = this._auth.signedInUser();
  }

  public async signOut(): Promise<void> {
    await this._auth.signOut();
  }
}
