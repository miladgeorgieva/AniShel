import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyC-rDdrBvVqLLr-pydk8qWvoyoFOJugC4k",
      authDomain: "anishel-be7d3.firebaseapp.com"
    })
  }
}