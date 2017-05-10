import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CommentService } from './services/comment.service';
import { PostService } from './services/post.service';
import { SlashService } from './services/slash.service';
import { UserService } from './services/user.service';

import { StoreModule } from '@ngrx/store';
import { reducer } from './app.reducer';

import { EffectsModule } from '@ngrx/effects'
import { PostEffects } from './post/post.effects';
import { CommentEffects } from './comment/comment.effects';
import { UserEffects } from './user/user.effects';
import { SlashEffects } from './slash/slash.effects';
import { ManagerEffects } from './manager/manager.effects';
import { PullEffects } from './pull/pull.effects';
import { AuthTokenStorageService } from './auth/auth-token.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(PostEffects),
    EffectsModule.run(CommentEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(SlashEffects),
    EffectsModule.run(ManagerEffects),
    EffectsModule.run(PullEffects)
   ],

  providers: [
    SlashService,
    CommentService,
    PostService,
    UserService,
    AuthTokenStorageService
  ]
})

export class CoreModule {

}
