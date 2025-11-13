import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AuthorArticles from "@/components/authors/AuthorArticles";

export default function AuthorPage() {
  const router = useRouter();
  const { userId } = router.query;

  if (!userId) return null;

  return (
    <>
      <Head>
        <title>Articles de l&apos;auteur - BlogHub</title>
        <meta name="description" content="Articles de cet auteur" />
      </Head>

      <AuthorArticles authorId={userId} />
    </>
  );
}
