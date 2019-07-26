import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [ 
        BrowserModule, 
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule { 
}
