import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { RichTextBoxComponent } from './components/shared/rich-text-box/rich-text-box.component';
import { QuillModule } from 'ngx-quill';
import { FileUploaderComponent } from './components/shared/file-uploader/file-uploader.component';
import { ChatBoxComponent } from './components/messenger/chat-box/chat-box.component';
import { MessageComponent } from './components/messenger/message/message.component';
import { AttachmentDirective } from './directives/attachment.directive';;
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EditProfileDialogComponent } from './components/dialog/edit-profile-dialog/edit-profile-dialog.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [	
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    WelcomePageComponent,
    RichTextBoxComponent,
    FileUploaderComponent,
    ChatBoxComponent,
    MessageComponent,
    AttachmentDirective,
    ProfilePageComponent,
    EditProfileDialogComponent,
    SearchComponent

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
  bootstrap: [AppComponent],
})
export class AppModule { }
