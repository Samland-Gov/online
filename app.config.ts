export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'Samland',
      description: 'The official website for the Samland Government.',
    },
    theme: {
      customizable: true,
      color: 'blue',
      radius: 0.5,
    },
    header: {
      title: 'Samland',
      showTitle: true,
      darkModeToggle: true,
      logo: {
        light: '/favicon.svg',
        dark: '/favicon.svg',
      },
      nav: [
        {
          title: 'Legislation',
          to: '/legislation',
          target: undefined,
        }
      ],
      links: [
        {
          icon: 'lucide:github',
          to: 'https://github.com/Samland-Gov/online',
          target: '_blank',
        }
      ],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
    },
    footer: {
      credits: 'Copyright © 2017 - 2024 Samland Government',
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/Samland-Gov/online',
        target: '_blank',
      }],
    },
    toc: {
      enable: true,
      title: 'On This Page',
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: 'https://github.com/Samland-Gov/online',
        target: '_blank',
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://github.com/Samland-Gov/online/issues',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    }
  }
});