import { Component, OnInit, Input, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/fetch/user';
import { UserService } from 'src/app/services/fetch/user.service';
import { BoardService } from 'src/app/services/fetch/board.service';
import { Post } from 'src/app/models/fetch/post';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() filter: any;
  posts: Post [] = [];
  post: Post;
  user: User;
  users: User [] = [];
  genderType = GenderType;
  content: string;
  commentContent: string;
  commentId: number;
  currentUser: User;

  constructor(private userService: UserService, private boardService: BoardService, private authService: AuthService, private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  clickedOut(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    
    if(!clickedInside)
      this.commentId = null;
  }

  ngOnInit(): void {
    this.initCurrentUser();
    this.initializeBoardPosts();

    //delete later 
    // |
    // v
    this.posts[0] = {
      id: 0,
      content: "Im a sssnek",
      posterId: 1
    }
    this.posts[1] = {
      id: 1,
      content: "Im a sssnek dude",
      posterId: 3
    }
    this.posts[2] = {
      id: 2,
      content: "Mamma mia de la bondziorno margerita insigne roma spaghetti",
      posterId: 2,
      comments: [{
        content: "To by nic nie dało i tak",
        posterId: 3
      },
      {
        content: "Jeszcze jak!",
        posterId: 1
      }
      ]
    }
    if(!! this.filter)
      this.posts = this.posts.filter(e => e.posterId === Number(this.filter));
    // ^
    // |
    //delete later
  }

  ngOnChanges(changes: SimpleChanges){
    this.ngOnInit();
  }

  initCurrentUser() {
    this.authService.currentUser$.subscribe((res) => {
      this.currentUser = res;
    })
  }

  initializeBoardPosts(){
    // this.boardService.getModels().subscribe((res) => { //TODO: uncomment after BE implementation 
    //   this.posts = res;
    // })

    if(!! this.filter)
      this.posts = this.posts.filter(e => e.posterId === Number(this.filter));

    // this.userService.getModels().subscribe((res) => { //TODO: uncomment after BE implementation 
    //   this.users = res;
    // })
  }

  createPost(){
    let newPost = this.post;
    newPost = {
      content: this.content,
      posterId: this.currentUser.id,                  //change later
      // attachment?: Attachment,
      // date?: Date,
    }

    this.boardService.postModel(newPost).subscribe((res) => {

    });

    this.content = "";

    this.posts.push(newPost);       //delete later

    this.initializeBoardPosts();
  }

  createComment(postId: number){
    let newComment = this.posts.find(e => e.id === postId);
    if (!! newComment.comments){
      newComment.comments.push({
        content: this.commentContent,
        posterId: this.currentUser.id,                  //change later
        // attachment?: Attachment,
        // date?: Date,
      })
    }
    else {
      newComment.comments = [{
        content: this.commentContent,
        posterId: this.currentUser.id,                  //change later
        // attachment?: Attachment,
        // date?: Date,
      }]
    }

    // this.boardService.postModel(newComment).subscribe((res) => { //TODO: uncomment after BE implementation 
   
    // });

    this.commentContent = "";
    
    this.posts[this.posts.indexOf(this.posts.find(e => e.id === postId))] = newComment;       //delete later

    this.initializeBoardPosts();

    this.commentId = null;
  }

}
