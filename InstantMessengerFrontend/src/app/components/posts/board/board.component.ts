import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { User } from 'src/app/models/fetch/user';
import { UserService } from 'src/app/services/fetch/user.service';
import { BoardService } from 'src/app/services/fetch/board.service';
import { Post } from 'src/app/models/fetch/post';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { EditPostDialogComponent } from '../../dialog/edit-post-dialog/edit-post-dialog.component';
import { DialogWindowService } from 'src/app/services/functional/dialog-window.service';
import { Board } from 'src/app/models/fetch/board';
import { FriendshipService } from 'src/app/services/fetch/friendship.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() userId: number;
  @Input() isHomeBoard: boolean;
  posts: Post [] = [];
  board: Board;
  users: User [] = [];
  content: string;
  commentContent: string;
  commentId: number;
  currentUser: User;
  commentToEditId: number;

  constructor(
    private boardService: BoardService,
    private authService: AuthService,
    private elementRef: ElementRef,
    private dialogService: DialogWindowService,
    private friendshipService: FriendshipService,
    public userService: UserService,) { }

  @HostListener('document:click', ['$event.target'])
  clickedOut(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if(!clickedInside)
      this.commentId = null;
  }

  ngOnInit(): void {
    this.initCurrentUser();
    this.initUsers();
    this.initializeBoardPosts();
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }

  initUsers() {
    this.userService.getModels().subscribe((res) => {
      this.users = res;
    })
  }

  openEditDialog(post: Post, isEditMode: boolean) {
    this.dialogService.openDialogWindow(EditPostDialogComponent, post, (data: Post) => { 
      if(data != null)  {
        if(!isEditMode) {
          this.submitPost(data);
        }
        else {
          this.updatePost(data);
        }
      }
    });  
  }

  initializeBoardPosts(){
    if(!this.isHomeBoard) {
      this.boardService.getBoardByUserId(this.userId).subscribe((response) => {
        this.board = response;
        this.posts = this.board.posts.sort((a, b) => a.date < b.date ? 1 : -1);
      })
    }
    else if(this.isHomeBoard) {
      this.friendshipService.getAllFriends(this.currentUser.id).subscribe((res) => {
        res.forEach((friend) => {
          this.boardService.getBoardByUserId(friend.user.id).subscribe((res) => {
            res.posts?.forEach((post) => {
              this.posts.push(post)
            })         
          })     
        })    
      this.posts = this.posts.sort((a, b) => a.date < b.date ? 1 : -1);
      })
    } 
  }

  submitPost(post: Post){
    this.boardService.addPost(post.content, this.currentUser.id).subscribe(()=> {
      this.initializeBoardPosts();
    });  
  }

  updatePost(post: Post) {
    this.boardService.editPost(post).subscribe(() => {
      this.initializeBoardPosts();
    })
  }

  deletePost(post: Post) {
    this.boardService.deletePostById(post.id).subscribe(() => {
      this.initializeBoardPosts();
    });
  }

  createComment(postId: number){
    this.boardService.addComment(this.commentContent, postId, this.currentUser.id).subscribe(() => {
      this.initializeBoardPosts();
    })
   
    this.initializeBoardPosts();
    this.commentId = null;
  }

  editComment(comment: Post) {
    this.boardService.editComment(comment).subscribe(()=> {
      this.initializeBoardPosts();
      this.commentToEditId = null;
    })
  }
  deleteComment(commentId: number) {
    this.boardService.deleteComment(commentId).subscribe(() => {
      this.initializeBoardPosts();
    })
  }

  getPostAuthor(post: Post) {
    return this.users.find(u => u.id === post.senderId)
  }
}
