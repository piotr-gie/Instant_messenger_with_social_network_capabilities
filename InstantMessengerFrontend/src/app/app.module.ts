import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RichTextBoxComponent } from './components/shared/rich-text-box/rich-text-box.component';
import { QuillModule } from 'ngx-quill';
import { FileUploaderComponent } from './components/shared/file-uploader/file-uploader.component';
import { ChatBoxComponent } from './components/messenger/chat-box/chat-box.component';
import { MessageComponent } from './components/messenger/message/message.component';
import { AttachmentDirective } from './directives/attachment.directive';

@NgModule({
  declarations: [	
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    WelcomeComponent,
    RichTextBoxComponent,
    FileUploaderComponent,
    ChatBoxComponent,
    MessageComponent,
    AttachmentDirective
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
