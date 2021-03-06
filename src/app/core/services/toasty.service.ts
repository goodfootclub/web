import { Injectable, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

@Injectable()
export class AppToastyService implements OnInit {

    get defaultOptions(): ToastOptions {
        return {
            title: 'Error!',
            showClose: true,
            timeout: 5000,
            theme: 'material',
        };
    }

    constructor(private toastyService: ToastyService,
                private toastyConfig: ToastyConfig) {
        this.error = this.error.bind(this);
        this.info = this.info.bind(this);
        this.success = this.success.bind(this);
        this.warning = this.warning.bind(this);
    }

    ngOnInit(): void {
        this.toastyConfig.theme = 'material';
        this.toastyConfig.position = 'top-right';
    }

    success(message: string, title?: string): void {
        this.show(message, 'success', title);
    }

    info(message: string, title?: string): void {
        this.show(message, 'info', title);
    }

    warning(message: string, title?: string): void {
        this.show(message, 'warning', title);
    }

    error(message: string, title?: string): void {
        this.show(message, 'error', title);
    }

    private show(message: string, method?: string, title?: string): void {
        const type = method ? method : 'info';
        const opts: ToastOptions = Object.assign(this.defaultOptions, {
            title: title ? title : null,
            msg: message,
        }) as ToastOptions;
        this.toastyService[type](opts);
    }
}
