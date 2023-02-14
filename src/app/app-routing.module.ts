import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule), canLoad: [AuthGuard] },
  {
    path: 'item-options',
    loadChildren: () => import('./item-options/item-options.module').then( m => m.ItemOptionsPageModule),
    canLoad: [AuthGuard]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule) ,
  canLoad: [AuthGuard]},
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'buscador',
    loadChildren: () => import('./buscador/buscador.module').then( m => m.BuscadorPageModule),
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
