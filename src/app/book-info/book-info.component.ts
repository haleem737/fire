import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import { map } from "rxjs/operators";

export interface Book {
  author: string;
  title: string;
  content?: string;
}
@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {


  newData = {
    author: 'Jeff Delaney',
    title: 'The Angular Firebase Survival Guide',
  }
  
  constructor(private afs: AngularFirestore) {}



  booksCollection: AngularFirestoreCollection<Book>;
  booksObservable: Observable<Book[]>;

  ngOnInit() {
    this.booksCollection = this.afs.collection('books');

    // TO GET DOCUMENT DATA WITHOUT DOCUEMENT ID
    this.booksObservable = this.booksCollection.valueChanges();

    // TO GET DOCUMENT DATA WITH DOCUEMENT ID
    this.booksObservable = this.booksCollection.snapshotChanges().pipe(map(arr => {
      return arr.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return { id, ...data };
      });
    }));

    // TO ADD NEW DOCUMENT
    // this.booksCollection.add(this.newData)
    //  /// optional Promise methods
    //  .then(() => console.log('success') )
    //  .catch(err => console.log(err) )
  }

}