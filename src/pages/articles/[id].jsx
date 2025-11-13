import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ArticleDetail from "@/components/articles/ArticleDetail";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return (
    <>
      <Head>
        <title>Article {id} - BlogHub</title>
        <meta name="description" content={`Lire l'article ${id}`} />
      </Head>

      <ArticleDetail postId={parseInt(id)} />
    </>
  );
}
