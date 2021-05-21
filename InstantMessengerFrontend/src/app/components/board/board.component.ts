import { Component, OnInit, Input } from '@angular/core';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { BoardService } from 'src/app/services/board.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() filter: any;
  posts: Post [] = [];
  model: User;
  models: User [] = [];

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
      posterId: 1
    }
    this.posts[2] = {
      content: "Im a sssnek dude",
      posterId: 2
    }
    // ^
    // |
    //delete later
    if(!! this.filter){
      this.userService.getModel(this.filter).subscribe((response) => {
        this.model = response;
      })
    } else {
      this.userService.getModels().subscribe((response) => {
        this.models = response;
      })
    }
  }

}
