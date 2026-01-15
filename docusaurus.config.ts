import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';

// Load generated API config (created by scripts/generate-plugin-config.js)
let apiConfig: OpenApiPlugin.Options = {};
try {
  apiConfig = require('./api-config.json');
} catch {
  // Config not yet generated - will be created by build:prepare script
  console.warn('api-config.json not found. Run "npm run build:prepare" first.');
}

const config: Config = {
  title: 'IncidentIQ API',
  tagline: 'Complete API reference for IncidentIQ',
  favicon: 'img/favicon.ico',

  // Production URL - GitHub Pages
  url: 'https://scopousiiq.github.io',
  baseUrl: '/iiq-docusaurus-docs/',

  // GitHub pages deployment config
  organizationName: 'scopousiiq',
  projectName: 'iiq-docusaurus-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Use the OpenAPI theme component for API docs
          docItemComponent: '@theme/ApiItem',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'default',
        config: apiConfig,
      } satisfies OpenApiPlugin.PluginOptions,
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  themeConfig: {
    // Disable dark mode - IncidentIQ is light-themed
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // API theme config - disable Try It panel
    api: {
      authPersistance: 'localStorage',
      hideSendButton: true, // Disable interactive API calls
    },
    navbar: {
      title: 'IncidentIQ API',
      logo: {
        alt: 'IncidentIQ Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          position: 'left',
          label: 'Getting Started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          href: 'https://github.com/incidentiq',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/',
            },
            {
              label: 'API Reference',
              to: '/docs/api/tickets/tickets-api',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'IncidentIQ Website',
              href: 'https://www.incidentiq.com',
            },
            {
              label: 'Support',
              href: 'https://support.incidentiq.com',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} IncidentIQ. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python', 'csharp', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
