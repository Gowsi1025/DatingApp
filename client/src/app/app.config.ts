import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideToastr } from "ngx-toastr";
import { errorInterceptor } from "./_interceptors/error.interceptor";
import { jwtInterceptor } from "./_interceptors/jwt.interceptor";
import { loadingInterceptor } from "./_interceptors/loading.interceptor";
import { routes } from "./app.routes";
import { NgxSpinnerModule } from "ngx-spinner";

export const appConfig: ApplicationConfig ={
    providers: [
        provideRouter(routes),
        provideToastr({
            positionClass:'toast-bottom-right'
        }),
        importProvidersFrom(NgxSpinnerModule),
        provideAnimations(),
        provideHttpClient(
            withInterceptors([errorInterceptor,jwtInterceptor,loadingInterceptor]),
            withInterceptorsFromDi())
    ]
}