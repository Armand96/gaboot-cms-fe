import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './mainapp/login/login.component';
import { RootComponent } from './mainapp/root/root.component';
import { NotfoundComponent } from './mainapp/layout/notfound/notfound.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: RootComponent,
        children: [
            { path: '', loadChildren: () => import('./mainapp/dashboard/dashboard.module').then(m => m.DashboardModule) },

            /* USER MENU */
            {
                path: 'user',
                loadChildren: () =>
                    import('./mainapp/user-menu/user/user.module').then(
                        (m) => m.UserModule,
                    ),
            },
            {
                path: 'role',
                loadChildren: () =>
                    import('./mainapp/user-menu/role/role.module').then(
                        (m) => m.RoleModule,
                    ),
            },
            {
                path: 'menu',
                loadChildren: () =>
                    import('./mainapp/user-menu/menu/menu.module').then(
                        (m) => m.MenuModule,
                    ),
            },

            /* PRODUCT MENU */
            {
                path: 'categories',
                loadChildren: () =>
                    import('./mainapp/product-menu/categories/categories.module').then(
                        (m) => m.CategoriesModule,
                    ),
            },
            {
                path: 'products',
                loadChildren: () =>
                    import('./mainapp/product-menu/products/products.module').then(
                        (m) => m.ProductsModule,
                    ),
            },

            /* ORDER MENU */
            {
                path: 'order',
                loadChildren: () =>
                    import('./mainapp/order/order.module').then(
                        (m) => m.OrderModule,
                    ),
            },

            { path: '**', component: NotfoundComponent }
        ],
    },
    { path: '**', component: NotfoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
