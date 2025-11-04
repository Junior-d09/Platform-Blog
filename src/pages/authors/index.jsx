import React from 'react';
import Head from 'next/head';
import AuthorList from '@/components/authors/AuthorList';

export default function AuthorsPage() {
  return (
    <>
      <Head>
        <title>Auteurs - BlogHub</title>
        <meta name="description" content="Découvrez nos auteurs" />
      </Head>

      <AuthorList />
    </>
  );
}