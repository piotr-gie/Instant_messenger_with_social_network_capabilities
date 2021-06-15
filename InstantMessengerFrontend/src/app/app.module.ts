import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { UserListComponent } from './pages/user-list/user-list.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ToastrModule } from 'ngx-toastr';
import { ContactListComponent } from './components/messenger/contact-list/contact-list.component';
import { FriendshipRequestListComponent } from './components/users/friendship-request-list/friendship-request-list.component';
import { UserCardComponent } from './components/users/user-card/user-card.component';
import { EditPostDialogComponent } from './components/dialog/edit-post-dialog/edit-post-dialog.component';
import { UserAvatarComponent } from './components/shared/user-avatar/user-avatar.component';
import { BoardComponent } from './components/posts/board/board.component';
import { RichPostComponent } from './components/posts/rich-post/rich-post.component';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


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
    SearchComponent,
    UserListComponent,
    SearchPageComponent,
    BoardComponent,
    ContactListComponent,
    FriendshipRequestListComponent,
    UserCardComponent,
    EditPostDialogComponent,
    RichPostComponent,
    UserAvatarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), 
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { 
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
