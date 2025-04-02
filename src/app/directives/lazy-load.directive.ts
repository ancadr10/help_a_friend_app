import { Directive, ElementRef, inject, output } from "@angular/core";

@Directive({
    selector: '[lazyLoad]'
})
export class LazyLoadDirective {
    lazyLoadEvent = output<{ target: HTMLElement }>();

    private observer!: IntersectionObserver;
    private readonly el = inject(ElementRef);

    ngOnInit() {
        this.initializeIntersectionObserver();
    }

    private initializeIntersectionObserver() {
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            rootMargin: '0px',
            threshold: 0.5
        });
        this.observer.observe(this.el.nativeElement);
    }

    private handleIntersection(entries: IntersectionObserverEntry[]): void {
        const entry = entries[0];
        if (entry.isIntersecting) {
            this.lazyLoadEvent.emit({ target: entry.target as HTMLElement });
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

}