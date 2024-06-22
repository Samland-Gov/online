import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  content: {
    sources: {
      // content: {
      //   driver: 'fs',
      //   prefix: '/',
      //   base: resolve(__dirname, 'content')
      // },
      legislation: {
        driver: 'github',
        repo: "Samland-Gov/legislation",
        branch: "main",
        dir: "content",
        prefix: '/legislation',
        base: resolve(__dirname, 'legislation', 'content')
      }
    }
  }
});
