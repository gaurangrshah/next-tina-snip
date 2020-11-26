import React, { useMemo } from "react";
import Head from "next/head";
import { TinaProvider, TinaCMS } from "tinacms";
import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { GitClient, GitMediaStore } from "@tinacms/git-client";
import { toMarkdownString } from "next-tinacms-markdown";
import slugify from "slugify";
import "../styles/styles.css";

import { ChakraProvider } from "@chakra-ui/core";
import theme from "@/chakra";

import { ToastProvider } from "@/chakra/contexts/toast-context";
import Nprogress from "@/components/nprogress";

import SEO from "../next-seo.config";

import DefaultLayout from "@/chakra/layouts/default";

const ProductCreatorPlugin = {
  __type: "content-creator",
  name: "Product",
  fields: [
    {
      name: "frontmatter.title",
      label: "Title",
      component: "text",
      validate(title) {
        if (!title) return "Required";
      },
    },
    {
      name: "frontmatter.price",
      label: "Price",
      component: "number",
      validate(price) {
        if (price == null) return "Required";
      },
    },
    {
      name: "frontmatter.image",
      label: "Image",
      component: "image",
      parse: (filename) => `/${filename}`,
      uploadDir: () => "/public",
      previewSrc: (formValues) => formValues.frontmatter.image,
    },
    {
      name: "frontmatter.excerpt",
      description: "This will be used for the product description in Snipcart",
      label: "Excerpt",
      component: "text",
    },
    {
      name: "markdownBody",
      label: "Description",
      component: "markdown",
    },
  ],
  onSubmit(formValues, cms) {
    const fileRelativePath = `products/${slugify(
      formValues.frontmatter.title,
      "_"
    )}.md`;
    return cms.api.git
      .writeToDisk({
        fileRelativePath: fileRelativePath,
        content: toMarkdownString(formValues),
      })
      .then(() => {
        cms.alerts.success("product created! Reload page to see new product");
      });
  },
};

const App = ({ Component, pageProps }) => {
  const gitClient = useMemo(() => {
    return new GitClient(`/___tina`);
  }, []);
  const cms = useMemo(() => {
    return new TinaCMS({
      enabled: process.env.NODE_ENV !== "production",
      sidebar: true,
      toolbar: { hidden: false },
      plugins: [MarkdownFieldPlugin, ProductCreatorPlugin],
      apis: {
        git: gitClient,
      },
      media: {
        store: new GitMediaStore(gitClient),
      },
    });
  }, []);

  return (
    <TinaProvider cms={cms}>
      {/* <div className='container'> */}
      <ChakraProvider resetCSS theme={theme}>
        <Nprogress />
        <ToastProvider>
          <DefaultLayout config={{ headerShow: true, footerShow: true }}>
            <Component {...pageProps} />
          </DefaultLayout>
        </ToastProvider>
      </ChakraProvider>
      {/* </div> */}
      <div hidden id='snipcart' data-api-key={process.env.SNIP_API_KEY}></div>
    </TinaProvider>
  );
};

export default App;
