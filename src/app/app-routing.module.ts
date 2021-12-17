import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/church/church.module').then(m => m.ChurchPageModule)
  },
  {
    path: 'church',
    loadChildren: () => import('./pages/church/church.module').then( m => m.ChurchPageModule)
  },
  {
    path: 'home', redirectTo: 'home/', pathMatch: 'full'
  },
  {
    path: 'home/:church',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./pages/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'slide',
    loadChildren: () => import('./pages/slide/slide.module').then( m => m.SlidePageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.module').then(m => m.VideoPageModule)
  },
  {
    path: 'video-list',
    loadChildren: () => import('./pages/video-list/video-list.module').then(m => m.VideoListPageModule)
  },
  {
    path: 'youtube-list',
    loadChildren: () => import('./pages/youtube-list/youtube-list.module').then(m => m.YoutubeListPageModule)
  },
  {
    path: 'category-list',
    loadChildren: () => import('./pages/category-list/category-list.module').then(m => m.CategoryListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/auth/recovery/recovery.module').then(m => m.RecoveryPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'new-church',
    loadChildren: () => import('./pages/new-church/new-church.module').then( m => m.NewChurchPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'plans',
    loadChildren: () => import('./pages/plans/plans.module').then( m => m.PlansPageModule)
  },
  {
    path: 'panel',
    loadChildren: () => import('./pages/panel/dashboard.module').then( m => m.DashboardPageModule)
  },




  // {
  //   path: 'location-map',
  //   loadChildren: () => import('./pages/location-map/location-map.module').then(m => m.LocationMapPageModule)
  // },
  // {
  //   path: 'upload-document',
  //   loadChildren: () => import('./pages/upload-document/upload-document.module').then(m => m.UploadDocumentPageModule)
  // },
  // {
  //   path: 'languages',
  //   loadChildren: () => import('./pages/languages/languages.module').then( m => m.LanguagesPageModule)
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
