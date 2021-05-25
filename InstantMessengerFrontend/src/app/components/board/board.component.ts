import { Component, OnInit, Input } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/fetch/user';
import { UserService } from 'src/app/services/fetch/user.service';
import { BoardService } from 'src/app/services/fetch/board.service';
import { Post } from 'src/app/models/fetch/post';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() filter: any;
  posts: Post [] = [];
  post: Post;
  user: User;
  users: User [] = [];
  genderType = GenderType;
  content: string;

  constructor(private userService: UserService, private boardService: BoardService) { }

  ngOnInit(): void {
    this.initializeBoardPosts();
  }

  initializeBoardPosts(){
    this.boardService.getModels().subscribe((response) => {
      this.posts = response;
    })
    //delete later 
    // |
    // v
    this.posts[0] = {
      content: "Im a sssnek",
      posterId: 1
    }
    this.posts[1] = {
      content: "Im a sssnek dude",
      posterId: 3
    }
    this.posts[2] = {
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
    // ^
    // |
    //delete later
    if(!! this.filter){
      this.userService.getModel(this.filter).subscribe((response) => {
        this.user = response;
      })
    } else {
      this.userService.getModels().subscribe((response) => {
        this.users = response;
      })
    }
  }

  createPost(){
    let newPost = this.post;
    newPost = {
      content: this.content,
      posterId: 1,                  //change later
      // attachment?: Attachment,
      // date?: Date,
    }

    this.boardService.postModel(newPost).subscribe((response) => {
      console.log(response)
    });

    this.content = "";

    this.posts.push(newPost);       //delete later

    this.ngOnInit();
  }

}
