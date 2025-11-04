import React from 'react';
import { useRouter } from 'next/router';
import ArticleList from '@/components/articles/ArticleList';
import Head from 'next/head';

export default function HomePage() {
  const router = useRouter();

  const handleViewDetails = (postId) => {
    router.push(`/articles/${postId}`);
  };

  return (
    <>
      <Head>
        <title>BlogHub - Accueil</title>
        <meta name="description" content="Découvrez nos derniers articles de blog" />
      </Head>
      
      <ArticleList onViewDetails={handleViewDetails} />
    </>
  );
}