import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import GoogleFonts from "next-google-fonts";

import { ColorModeScript } from "@chakra-ui/core";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel='preconnect' href='https://app.snipcart.com' />
        <link rel='preconnect' href='https://cdn.snipcart.com' />
        <link
          rel='stylesheet'
          href='https://cdn.snipcart.com/themes/v3.0.18/default/snipcart.css'
        />
        <script src='https://cdn.snipcart.com/themes/v3.0.18/default/snipcart.js'></script>
        <GoogleFonts href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' />

        <Head />
        <body>
          <ColorModeScript initialColorMode='light' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
