import { reactive } from '@vue/reactivity';

const MutationObserver =
    window.MutationObserver ||
    (window as any).WebKitMutationObserver ||
    (window as any).MozMutationObserver;

export const useDOMSize = <T extends HTMLElement>() => {
    const size = reactive({
        width: 0,
        height: 0,
    });
    return {
        size,
        sizeRef(elem: T) {
            if ((window as any).ResizeObserver) {
                new (window as any).ResizeObserver(entries => {
                    const { width, height } = entries[0].contentRect;
                    if (width !== size.width) {
                        size.width = width;
                    }
                    if (height !== size.height) {
                        size.height = height;
                    }
                }).observe(elem);
                return;
            }
            if (!window.MutationObserver) {
                return;
            }
            new MutationObserver(mutationList => {
                let { width, height } = elem.getBoundingClientRect();

                if (width !== size.width) {
                    size.width = width;
                }
                if (height !== size.height) {
                    size.height = height;
                }
            }).observe(elem, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        },
    };
};
