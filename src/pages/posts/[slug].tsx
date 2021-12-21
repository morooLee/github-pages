import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import Blog, { Frontmatter } from '../../lib/blog';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';
import ReactUtterances from '../../components/ReactUtterances';
import { useDarkModeContext } from '../../lib/DarkModeContext';
import PostLayout from '../../components/layouts/PostLayout';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkEmoji from 'remark-emoji';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import rehypeToc, {
  HtmlElementNode,
  Options as rehypeTocOptions,
} from '@jsdevtools/rehype-toc';
import PostContent from '../../components/PostContent';
import PostFrontmatter from '../../components/PostFrontmatter';
import { s } from 'hastscript';
const toJsx = require('@mapbox/hast-util-to-jsx');

interface PostProps {
  frontmatter: Frontmatter;
  source: MDXRemoteSerializeResult;
  toc: MDXRemoteSerializeResult | undefined;
  content: string;
  blog: any;
}
export default function Post({
  frontmatter,
  source,
  toc,
  content,
  blog,
}: PostProps) {
  const router = useRouter();
  const [isDarkMode] = useDarkModeContext();
  const { slug } = router.query;

  // TODO 스크롤 헤더 크기만큼 내리기
  // useEffect(() => {
  //   const handleHashChange = () => {
  //     const rem = Number(
  //       window
  //         .getComputedStyle(document.documentElement)
  //         .fontSize.replace('px', '')
  //     );
  //     window.scrollTo({ top: window.scrollY - rem * 5.25 });
  //   };

  //   window.addEventListener('hashchange', handleHashChange);

  //   return () => {
  //     window.removeEventListener('hashchange', handleHashChange);
  //   };
  // }, []);

  // const headingElementsRef = useRef({});

  // TODO 목차
  // useEffect(() => {
  //   const callback = (headings) => {
  //     headingElementsRef.current = headings.reduce((map, headingElement) => {
  //       map[headingElement.target.id] = headingElement;
  //       return map;
  //     }, headingElementsRef.current);
  //   }

  //     const observer = new IntersectionObserver(callback, {
  //       rootMargin: '-5.25rem 0px 0px 0px',
  //     });

  //     const contentElement = document.getElementById('#post-content');
  //     if (contentElement) {
  //       const headingElements = Array.from(contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  //       headingElements.forEach((element) => observer.observe(element));
  //     }

  //     return () => observer.disconnect();
  //   }, []);

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta property="og:type" content="blog" />
        <meta
          property="og:url"
          content={`https://blog.moroo.dev${router.asPath}`}
        />
        <meta property="og:title" content={frontmatter.title} />
        <meta
          property="og:description"
          content={frontmatter.description || frontmatter.title}
        />
        {frontmatter.coverImageUrl && (
          <>
            <meta property="og:image" content={frontmatter.coverImageUrl} />
            <meta property="og:image:alt" content={frontmatter.title} />
          </>
        )}
        <meta property="og:site_name" content="Moroo's Blog" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="article:author" content="moroo" />
        {/* <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@moroo" />
        <meta name="twitter:creator" content="@moroo" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta
          property="twitter:description"
          content={frontmatter.description || frontmatter.title}
        />
        {frontmatter.coverImageUrl && (
          <>
            <meta name="twitter:image" content={frontmatter.coverImageUrl} />
            <meta property="twitter:image:alt" content={frontmatter.title} />
          </>
        )}
      </Head>
      <PostLayout blog={blog} frontmatter={frontmatter} toc={toc}>
        <main id="post" className="w-full md:min-w-3xl">
          <section id="post-frontmatter" className="p-5 mb-10">
            <PostFrontmatter frontmatter={frontmatter} />
          </section>
          <article
            id="post-content"
            className="markdown dark:markdown-invert max-w-none p-5"
          >
            <PostContent source={source} />
          </article>
          <ReactUtterances
            repo="morooLee/github-pages"
            type="pathname"
            label="comments"
            theme={isDarkMode ? 'github-dark' : 'github-light'}
          />
        </main>
      </PostLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  if (!params) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const blog = Blog.getBlog();
  const post = Blog.getPost(params.slug);

  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const linkSvg = s(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      class: 'text-2xl font-semibold',
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
  let tocContent: HtmlElementNode | undefined;
  let tocSource: MDXRemoteSerializeResult | undefined;

  const mdxSource: MDXRemoteSerializeResult = await serialize(post.content, {
    scope: { ...post.frontmatter },
    mdxOptions: {
      remarkPlugins: [
        remarkParse,
        remarkGfm,
        remarkEmoji,
        remarkSlug,
        [
          remarkAutolinkHeadings,
          {
            content: {
              type: 'element',
              tagName: 'span',
              properties: { className: ['icon', 'icon-link'] },
              children: [linkSvg],
            },
          },
        ],
      ],
      rehypePlugins: [
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
      ],
    },
  });

  if (tocContent) {
    tocSource = await serialize(toJsx(tocContent));
  }

  return {
    props: {
      frontmatter: post.frontmatter,
      source: mdxSource,
      toc: tocSource,
      content: post.content,
      blog,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  Blog.init();

  return {
    paths: Blog.posts.map((post) => {
      return {
        params: {
          slug: post.frontmatter.slug,
        },
      };
    }),
    fallback: false,
  };
};
