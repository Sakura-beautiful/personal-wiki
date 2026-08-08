import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://sakura-beautiful.github.io',
  base: '/personal-wiki/',
  integrations: [
    starlight({
      title: 'Personal Wiki',
      description: 'Notes on building machines that understand the world.',
      social: {
        github: 'https://github.com/Sakura-beautiful',
      },
      editLink: {
        baseUrl: 'https://github.com/Sakura-beautiful/personal-wiki/edit/main/',
      },
      customCss: [
        './src/styles/starlight.css',
        'katex/dist/katex.min.css',
      ],
      sidebar: [
        {
          label: 'Robotics',
          collapsed: true,
          autogenerate: { directory: 'docs/robotics' },
        },
        {
          label: 'AI',
          collapsed: false,
          autogenerate: { directory: 'docs/ai' },
        },
        {
          label: 'Computer Vision',
          collapsed: true,
          autogenerate: { directory: 'docs/computer-vision' },
        },
        {
          label: 'Robot Learning',
          collapsed: true,
          autogenerate: { directory: 'docs/robot-learning' },
        },
        {
          label: 'Engineering',
          collapsed: true,
          autogenerate: { directory: 'docs/engineering' },
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
    // Stub integration to prevent Starlight from auto-adding @astrojs/sitemap (P1 feature)
    { name: '@astrojs/sitemap', hooks: {} },
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
