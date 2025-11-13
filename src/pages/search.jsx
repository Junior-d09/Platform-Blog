import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Search } from "lucide-react";
import ArticleCard from "@/components/articles/ArticleCard";
import SearchBar from "@/components/search/SearchBar";
import FilterPanel from "@/components/search/FilterPanel";
import { useFetch } from "@/hooks/useFetch";
import { useSearch } from "@/hooks/useSearch";
import { API_ENDPOINTS } from "@/utils/constants";
import { getCommentsCount } from "@/utils/helpers";

export default function SearchPage() {
  const router = useRouter();
  const { data: posts } = useFetch(API_ENDPOINTS.POSTS);
  const { data: users } = useFetch(API_ENDPOINTS.USERS);
  const { data: comments } = useFetch(API_ENDPOINTS.COMMENTS);

  const {
    searchQuery,
    setSearchQuery,
    selectedAuthorId,
    setSelectedAuthorId,
    filteredPosts,
    resultsCount,
  } = useSearch(posts);

  const handleViewDetails = (postId) => {
    router.push(`/articles/${postId}`);
  };

  return (
    <>
      <Head>
        <title>Recherche - BlogHub</title>
        <meta name="description" content="Rechercher des articles" />
      </Head>

      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recherche d&apos;articles
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 text-gray-950">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterPanel
              users={users}
              selectedAuthorId={selectedAuthorId}
              onAuthorChange={setSelectedAuthorId}
            />
          </div>

          <p className="text-gray-600">
            {resultsCount} résultat{resultsCount > 1 ? "s" : ""} trouvé
            {resultsCount > 1 ? "s" : ""}
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun article trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <ArticleCard
                key={post.id}
                post={post}
                author={users?.find((u) => u.id === post.userId)}
                commentsCount={getCommentsCount(comments, post.id)}
                onViewDetails={() => handleViewDetails(post.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
