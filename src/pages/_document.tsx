import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { extractCritical } from '@emotion/server';
import { mediaStyles } from 'src/components/Media';
import { useDarkModeContext } from 'src/lib/DarkModeContext';
import Script from 'next/script';
import { GTagScript } from 'src/lib/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html lang="ko-KR">
        <Head>
          <link rel="icon" href="/assets/favicon.png" />
          <meta name="theme-color" content="#21262d" />
          {/* <style
            data-emotion-css={(this.props as any).ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: (this.props as any).css }}
          /> */}
          <style
            // type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5229752344777211"
            crossOrigin="anonymous"
          ></script>
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
