"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category?: string;
  status: "draft" | "published";
}

const POSTS_PER_PAGE = 2;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://polynovea-admin-488b.vercel.app/api/content/blog-posts");
        const data = await response.json();
        const published = data.data?.filter((p: BlogPost) => p.status === "published") || [];
        setPosts(published);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  if (loading) return <div style={{ color: "var(--text-primary)" }}>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="blog-main">
        <div className="container blog-container">
          <div className="blog-header" data-reveal>
            <span className="t-label" style={{ color: "var(--accent-authority-muted)" }}>
              Insights
            </span>
            <h1
              className="t-display-md"
              style={{ marginTop: "var(--space-md)", color: "var(--text-primary)" }}
            >
              The Blog
            </h1>
            <p className="t-body-lg" style={{ marginTop: "var(--space-md)" }}>
              Intelligence, music, and systems thinking. Direct from the team.
            </p>
          </div>

          <div className="search-wrapper" data-reveal>
            <input
              type="text"
              placeholder="Search articles..."
              className="search-input"
              aria-label="Search articles"
            />
          </div>

          <div className="blog-grid">
            {currentPosts.length > 0 ? (
              currentPosts.map((post, i) => (
                <article
                  key={post.id}
                  className="blog-card"
                  data-reveal
                  data-reveal-delay={String(i * 80)}
                >
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      {post.category && <span>{post.category}</span>}
                      {post.category && <span>·</span>}
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="blog-title">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <Link href={`/blog/${post.id}`} className="read-more">
                      Read more →
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <p style={{ color: "var(--text-secondary)" }}>No posts yet.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination" data-reveal>
              {currentPage > 1 && (
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ←
                </button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-btn ${page === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  →
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .blog-main {
          background: var(--bg-primary);
          min-height: 100vh;
          padding-top: calc(var(--nav-height) + var(--space-2xl));
          padding-bottom: var(--space-4xl);
          /* Scope missing brand variables locally */
          --bg-elevated: #1e1e22;
          --text-muted: var(--text-disabled);
        }

        .blog-container {
          max-width: var(--max-width);
          margin-inline: auto;
        }

        .blog-header {
          margin-bottom: var(--space-2xl);
        }

        .search-wrapper {
          margin-bottom: var(--space-2xl);
        }

        .search-input {
          width: 100%;
          max-width: 480px;
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.9375rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }

        .search-input:focus {
          border-color: var(--accent-intelligence);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.18);
        }

        .search-input::placeholder {
          color: var(--text-disabled);
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-lg);
        }

        .blog-card {
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          border-radius: 10px;
          padding: var(--space-lg);
          transition: all 0.2s ease;
        }

        .blog-card:hover {
          background: var(--bg-elevated);
          border-color: var(--accent-intelligence);
        }

        .blog-card-content {
          display: flex;
          flex-direction: column;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--text-muted);
          font-size: 0.8125rem;
          margin-bottom: var(--space-sm);
        }

        .blog-title a {
          color: var(--text-primary);
          font-weight: 600;
          font-size: 1.25rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .blog-title a:hover {
          color: var(--accent-intelligence);
        }

        .blog-excerpt {
          color: var(--text-secondary);
          font-size: 0.9375rem;
          line-height: 1.5;
          margin-top: var(--space-sm);
        }

        .read-more {
          display: inline-block;
          margin-top: var(--space-md);
          color: var(--accent-intelligence);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .read-more:hover {
          color: var(--accent-authority);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--space-xs);
          margin-top: var(--space-3xl);
        }

        .page-btn {
          background: var(--bg-card);
          border: 1px solid var(--border-muted);
          color: var(--text-primary);
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-btn:hover {
          background: var(--bg-elevated);
        }

        .page-btn.active {
          background: var(--accent-intelligence);
          color: white;
          border-color: var(--accent-intelligence);
        }

        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
