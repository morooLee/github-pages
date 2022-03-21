import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
// import remarkEmoji from 'remark-emoji';
import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc, {
  HtmlElementNode,
  Options as rehypeTocOptions,
} from '@jsdevtools/rehype-toc';
import stringWidth from 'string-width';
import { s, h } from 'hastscript';
import { Element } from 'hastscript/lib/core';
const toJsx = require('@mapbox/hast-util-to-jsx');

const LINK_SVG_TAG: Element = s(
  'svg',
  {
    xmlns: 'http://www.w3.org/2000/svg',
    class: 'text-2xl font-semibold mr-2',
    width: '1em',
    height: '1em',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    'stroke-width': '2',
  },
  s('path', {
    d: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  })
);

interface CompiledSourceOptions {
  isAutoLinkHeading: boolean;
  scope?: Record<string, unknown>;
}

export default async function compiledSource(
  source: string,
  options: CompiledSourceOptions
) {
  let tocContent: HtmlElementNode | undefined;
  let toc: MDXRemoteSerializeResult | undefined;

  const content: MDXRemoteSerializeResult = await serialize(source, {
    scope: options?.scope,
    mdxOptions: {
      remarkPlugins: [[remarkGfm, { stringLength: stringWidth }], remarkGemoji],
      rehypePlugins: options.isAutoLinkHeading
        ? [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                // content: {
                //   type: 'element',
                //   tagName: 'span',
                //   properties: {
                //     className: ['icon', 'icon-link', 'inline-block', 'mr-2'],
                //   },
                //   children: [LINK_SVG_TAG],
                // },
                group(node: Element) {
                  console.log(node);
                  return h('.heading-' + node.tagName.charAt(1) + '-group');
                },
                content(node: Element): Element[] {
                  return [LINK_SVG_TAG];
                },
              },
            ],
            [
              rehypeToc,
              {
                nav: true,
                customizeTOC: (toc) => {
                  tocContent = toc;
                  return false;
                },
              } as rehypeTocOptions,
            ],
          ]
        : [],
    },
  });
  if (tocContent) {
    toc = await serialize(toJsx(tocContent));
  }

  return {
    content,
    toc,
  };
}
