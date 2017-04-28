import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BattleshipComponent } from './battleship/battleship.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';

const appRoutes: Routes = [
  { path: 'battleship', component: BattleshipComponent },
  { path: 'tictactoe', component: TictactoeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BattleshipComponent,
    TictactoeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
