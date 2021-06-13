import { Component, OnInit, Input, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/fetch/user';
import { UserService } from 'src/app/services/fetch/user.service';
import { BoardService } from 'src/app/services/fetch/board.service';
import { Post } from 'src/app/models/fetch/post';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { OnChanges } from '@angular/core';
import { EditPostDialogComponent } from '../../dialog/edit-post-dialog/edit-post-dialog.component';
import { DialogWindowService } from 'src/app/services/functional/dialog-window.service';
import { Board } from 'src/app/models/fetch/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() filter: any;
  posts: Post [] = [];
  board: Board;
  users: User [] = [];
  content: string;
  commentContent: string;
  commentId: number;
  currentUser: User;

  constructor(
    private boardService: BoardService,
    private authService: AuthService,
    private elementRef: ElementRef,
    private dialogService: DialogWindowService) { }

  @HostListener('document:click', ['$event.target'])
  clickedOut(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if(!clickedInside)
      this.commentId = null;
  }

  ngOnInit(): void {
    this.initializeBoardPosts();
    
    // if(!! this.filter)
    //   this.posts = this.posts.filter(e => e.senderId === Number(this.filter));
    // // ^
    // // |
    // //delete later
  }

  openEditDialog(post: Post) {
    this.dialogService.openDialogWindow(EditPostDialogComponent, post, (data: Post) => { 
      if(data != null)  {
        this.submitPost(data);
      }
    });  
  }

  initializeBoardPosts(){
    this.boardService.getBoardByUserId(1).subscribe((response) => {
      this.board = response;
      this.posts = this.board.posts.sort((a, b) => a.date < b.date ? 1 : -1);
      console.log(this.posts);
    })
  }

  submitPost(post: Post){
    this.boardService.addPost(post.content, 1).subscribe(()=> {
      this.initializeBoardPosts();
    });  
  }

  deletePost(post: Post) {
    this.boardService.deletePostById(post.id).subscribe();
  }

  createComment(postId: number){
    let newComment = this.posts.find(e => e.id === postId);
    if (!! newComment.comments){
      newComment.comments.push({
        content: this.commentContent,
        senderId: this.currentUser.id,                  //change later
        // attachment?: Attachment,
      })
    }
    else {
      newComment.comments = [{
        content: this.commentContent,
        senderId: this.currentUser.id,                  //change later
      }]
    }

    // this.boardService.postModel(newComment).subscribe((response) => { //TODO: uncomment after BE implementation 
   
    // });

    this.commentContent = ""; 
    this.posts[this.posts.indexOf(this.posts.find(e => e.id === postId))] = newComment;       //delete later
    this.initializeBoardPosts();
    this.commentId = null;
  }
}
