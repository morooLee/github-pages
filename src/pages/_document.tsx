import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import Blog from '../lib/blog';
import { extractCritical } from '@emotion/server';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    Blog.init();
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html lang="ko-KR">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <style
            data-emotion-css={(this.props as any).ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: (this.props as any).css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
