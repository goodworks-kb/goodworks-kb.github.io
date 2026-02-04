import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Language } from '../lib/language'
import { getTranslation } from '../lib/language'
import { supabase } from '../lib/supabase'

interface HomeProps {
  language: Language
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image_url: string | null
  published_at: string | null
  created_at: string
}

function stripMarkdown(text: string, maxLength: number = 160): string {
  // Remove markdown syntax
  let stripped = text
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Links
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/\n+/g, ' ') // Newlines
    .trim()

  if (stripped.length > maxLength) {
    stripped = stripped.substring(0, maxLength).trim() + '...'
  }

  return stripped
}

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogList({ language }: HomeProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, content, featured_image_url, published_at, created_at')
          .eq('published', true)
          .order('published_at', { ascending: false, nullsFirst: false })
          .order('created_at', { ascending: false })

        if (error) throw error

        setPosts(data || [])
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError(getTranslation('blogError', language))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [language])

  if (loading) {
    return (
      <section className="blog">
        <div className="container">
          <div className="blog-loading">
            <p>{getTranslation('blogLoading', language)}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="blog">
        <div className="container">
          <div className="blog-error">
            <h1>{getTranslation('blogError', language)}</h1>
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="blog">
      <div className="container">
        <h2 className="section-title">{getTranslation('blogTitle', language)}</h2>
        <p className="section-subtitle">{getTranslation('blogSubtitle', language)}</p>
        <div className="blog-list">
          {posts.length === 0 ? (
            <p>{getTranslation('blogNotFound', language)}</p>
          ) : (
            posts.map((post) => {
              const excerpt = post.excerpt || stripMarkdown(post.content)
              const displayDate = formatDate(post.published_at || post.created_at)

              return (
                <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
                  {post.featured_image_url && (
                    <img src={post.featured_image_url} alt={post.title} className="blog-card-image" />
                  )}
                  <div className="blog-card-content">
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{excerpt}</p>
                    {displayDate && <p className="blog-card-date">{displayDate}</p>}
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
