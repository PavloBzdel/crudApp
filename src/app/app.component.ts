import { Component } from '@angular/core';
import { PostService } from './services/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from './interfaces/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented');
  }
  allPost: Post[] = [];

  postForm = new FormGroup({
    model: new FormControl('', Validators.required),
    engine: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  });
  editPostForm = new FormGroup({
    model: new FormControl('', Validators.required),
    engine: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  });
  msg: string = '';
  style: string = '';
  success: boolean = false;

  showEditForm: boolean = false;
  idEditPost: number = 1;
  constructor(private data: PostService) {}
  ngOnInit() {
    this.data.getPost().subscribe((posts: Post[] | any) => {
      this.allPost = posts;
    });
  }

  addPost() {
    const post = this.postForm.value;
    this.data.createPost(post).subscribe((res: Post | any) => {
      this.allPost.push(res);
      this.postForm.patchValue({
        model: '',
        engine: '',
        color: '',
      });
      this.showMessage('post added', 'success');
    });
  }
  deletePost(id: any) {
    this.data.deletePost(id).subscribe((_: any) => {
      this.allPost = this.allPost.filter((p) => p.id !== id);
      this.showMessage('post deleted', 'danger');
    });
  }
  editPost() {
    const post = this.editPostForm.value;
    this.data.updatePost(post, this.idEditPost).subscribe((res: Post | any) => {
      this.postForm.patchValue({
        model: '',
        engine: '',
        color: '',
      });
      this.showMessage('post edited', 'success');
      this.allPost.forEach((obj: Post) => {
        if (obj.id === this.idEditPost) {
          obj.model = res.model;
          obj.engine = res.engine;
          obj.color = res.color;
        }
      });
      this.showEditForm = false;
    });
  }
  showMessage(text: string, style: string) {
    this.msg = text;
    this.success = true;
    this.style = style;
    setTimeout((_: any) => {
      this.success = false;
    }, 2000);
  }
  toggleEditPost(post: Post) {
    this.showEditForm = true;
    this.idEditPost = post.id;
    this.editPostForm.patchValue({
      model: post.model,
      engine: post.engine,
      color: post.color,
    });
  }
}
