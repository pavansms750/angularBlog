import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  publishedPosts: BlogPost[];
  draftPosts: BlogPost[];

  constructor() {
    this.publishedPosts = [];
    this.draftPosts = [];
  }

  publishPost(post: BlogPost) {
    this.publishedPosts.push(post);
    console.log(this.publishedPosts);
  }

  draftPost(post: BlogPost) {
    this.draftPosts.push(post);
    console.log(this.draftPosts);
  }
}
