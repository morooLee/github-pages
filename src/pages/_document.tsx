import Document, { DocumentContext } from 'next/document';
import Blog from '../lib/blog';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    Blog.init();
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
}

export default MyDocument;
