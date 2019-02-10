import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';

import {delay} from 'rxjs/operators';
import { ModalService } from '../services/modal.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: any = [];
  postsSubscription: any;
  timerSubscription: any;
  post: any;
  constructor(private postService: PostService, private modalService: ModalService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postsSubscription = this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log(posts);
      this.subscribeToPosts();
    });
  }

  subscribeToPosts() {
    const observable = Observable.create((observer) => {
      observer.next();
    });
    this.timerSubscription = observable.pipe(delay(10000)).subscribe(() => {
      this.getPosts();
    });
  }

  openRawDataModal(id: string, item = {}) {
    this.post = JSON.stringify(item);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnDestroy() {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

}
