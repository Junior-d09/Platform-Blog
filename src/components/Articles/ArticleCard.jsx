import Link from "next/link";
import { useFavorites } from "../../context/FavoritesContext";

export default function ArticleCard({ post, author, commentsCount }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(post.id);

  // preview 120 chars
  const preview = (post.body || "").slice(0, 120) + (post.body?.length > 120 ? "…" : "");

  // synthetic date for demo (JSONPlaceholder has none)
//   const date = new Date(Date.now() - post.id * 86400000).toLocaleDateString();

  return (
    <article style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, display: "flex", gap: 12 }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 8px 0" }}>
          <Link href={`/articles/${post.id}`}><a>{post.title}</a></Link>
        </h3>
        <div style={{ fontSize: 13, color: "#555" }}>{preview}</div>
        <div style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
          Par <Link href={`/authors/${author?.id || post.userId}`}><a>{author?.name || "Inconnu"}</a></Link> • {date} • {commentsCount ?? 0} commentaires
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <button onClick={() => toggleFavorite(post.id)} aria-label="Favori" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}>
          {isFav ? "♥" : "♡"}
        </button>
        <Link href={`/articles/${post.id}`}><a style={{ fontSize: 13 }}>Voir</a></Link>
      </div>
    </article>
  );
}