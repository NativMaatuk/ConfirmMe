import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatInputModule } from '@angular/material/input';
import { MainComponent } from './main/main.component'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';

export const firebaseConfig={
    apiKey: "AIzaSyCtED3pmR5tkI7u0taAM7paBP1LGaBK11s",
    authDomain: "confirmme-cf7da.firebaseapp.com",
    projectId: "confirmme-cf7da",
    storageBucket: "confirmme-cf7da.appspot.com",
    messagingSenderId: "977555707609",
    appId: "1:977555707609:web:bcc0905779e2f66e0410c8",
    measurementId: "G-ZRL1P0N2Y4"
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ControlPanelComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
