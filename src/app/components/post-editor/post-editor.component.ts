import { Component, OnInit, Input } from '@angular/core';
import * as BalloonBlockEditor from '@ckeditor/ckeditor5-build-balloon-block';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { BlogService } from 'src/app/services/blog.service';
import { BlogPost } from 'src/app/models/blog-post.model';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  mode: string;
  editor: any;
  editorConfig: any;
  postId: string;
  postTitle: string;
  postExcerpt: string;
  postContent: string;
  bannerImageURL: string;
  updatingBannerImage: boolean;
  visible = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[];
  postTags: Array<string>;

  constructor(
    private router: Router,
    private blogService: BlogService
  ) {
    this.mode = 'new';
    this.editor = BalloonBlockEditor;
    this.postContent = '';
    this.postTitle = '';
    this.bannerImageURL = '';
    this.updatingBannerImage = false;
    this.editorConfig = {
      placeholder: 'Start writing...',
      toolbar: [ 'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote' ],
      heading: {
          options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
          ]
      }
    };
    this.postTags = [];
    this.separatorKeysCodes = [ENTER, COMMA];
  }

  ngOnInit() {
    if (this.router.url.split('/')[1] === 'edit') {
      this.mode = 'edit';
    }

    if (this.mode === 'new') {
      this.postId = uuid.v4();
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.postTags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(postTag: string): void {
    const index = this.postTags.indexOf(postTag);

    if (index >= 0) {
      this.postTags.splice(index, 1);
    }
  }

  saveDraft() {
    const post: BlogPost = {
      id: this.postId,
      title: this.postTitle,
      excerpt: this.postExcerpt,
      content: this.postContent,
      bannerImage: this.bannerImageURL,
      tags: this.postTags
    };
    this.blogService.draftPost(post);
  }

  publishPost() {
    const post: BlogPost = {
      id: this.postId,
      title: this.postTitle,
      excerpt: this.postExcerpt,
      content: this.postContent,
      bannerImage: this.bannerImageURL,
      tags: this.postTags
    };
    this.blogService.publishPost(post);
  }

}
