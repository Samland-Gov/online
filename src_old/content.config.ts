import { defineCollection } from 'astro:content';
import { IndigoClient } from "./api/legislation/api";
import { legislationLoader } from './api/legislation/loader';

export const legislation_client = new IndigoClient('https://legislation.minersonline.uk/api/v3/akn/zl/.json', import.meta.env.PRIVATE_INDIGO_API_KEY, "en");

export const legislation = defineCollection({
    loader: legislationLoader({ client: legislation_client })
});

export const collections = { legislation };