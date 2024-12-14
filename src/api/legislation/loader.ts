import type { Loader, LoaderContext } from 'astro/loaders';
import { IndigoClient } from './api';

export function legislationLoader(options: { client: IndigoClient }): Loader {
    return {
        name: 'legislation-loader',
        async load({ store, meta, logger }: LoaderContext) {
            const works = await options.client.pull_works();
            works.forEach((work) => {
                store.set({
                    id: work.frbrUri,
                    data: {
                        ...work,
                    },
                });
            });
        },
    };
}
