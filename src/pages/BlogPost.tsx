import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { Components } from 'react-markdown'
import { Language } from '../lib/language'
import { getTranslation } from '../lib/language'
import { supabase } from '../lib/supabase'

interface BlogPostProps {
  language: Language
}

interface BlogPostData {
  id: string
  title: string
  slug: string
  content: string
  featured_image_url: string | null
  published_at: string | null
  created_at: string
}

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Custom components for markdown rendering
const markdownComponents: Components = {
  // Headings
  h1: ({ node, ...props }) => <h1 className="blog-markdown-h1" {...props} />,
  h2: ({ node, ...props }) => <h2 className="blog-markdown-h2" {...props} />,
  h3: ({ node, ...props }) => <h3 className="blog-markdown-h3" {...props} />,
  h4: ({ node, ...props }) => <h4 className="blog-markdown-h4" {...props} />,
  h5: ({ node, ...props }) => <h5 className="blog-markdown-h5" {...props} />,
  h6: ({ node, ...props }) => <h6 className="blog-markdown-h6" {...props} />,
  
  // Paragraphs
  p: ({ node, ...props }) => <p className="blog-markdown-p" {...props} />,
  
  // Lists
  ul: ({ node, ...props }) => <ul className="blog-markdown-ul" {...props} />,
  ol: ({ node, ...props }) => <ol className="blog-markdown-ol" {...props} />,
  li: ({ node, ...props }) => <li className="blog-markdown-li" {...props} />,
  
  // Links
  a: ({ node, href, ...props }) => {
    const linkHref = href || ''
    const isExternal = linkHref.startsWith('http') || linkHref.startsWith('https')
    return (
      <a
        className="blog-markdown-a"
        href={linkHref}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      />
    )
  },
  
  // Images
  img: ({ node, ...props }) => (
    <img className="blog-markdown-img" alt={props.alt || ''} {...props} />
  ),
  
  // Code blocks
  code: ({ node, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    const isInline = !match
    return isInline ? (
      <code className="blog-markdown-code-inline" {...props} />
    ) : (
      <code className={`blog-markdown-code-block ${className || ''}`} {...props} />
    )
  },
  
  pre: ({ node, ...props }) => <pre className="blog-markdown-pre" {...props} />,
  
  // Blockquotes
  blockquote: ({ node, ...props }) => (
    <blockquote className="blog-markdown-blockquote" {...props} />
  ),
  
  // Horizontal rule
  hr: ({ node, ...props }) => <hr className="blog-markdown-hr" {...props} />,
  
  // Tables
  table: ({ node, ...props }) => <table className="blog-markdown-table" {...props} />,
  thead: ({ node, ...props }) => <thead className="blog-markdown-thead" {...props} />,
  tbody: ({ node, ...props }) => <tbody className="blog-markdown-tbody" {...props} />,
  tr: ({ node, ...props }) => <tr className="blog-markdown-tr" {...props} />,
  th: ({ node, ...props }) => <th className="blog-markdown-th" {...props} />,
  td: ({ node, ...props }) => <td className="blog-markdown-td" {...props} />,
  
  // Strong and emphasis
  strong: ({ node, ...props }) => <strong className="blog-markdown-strong" {...props} />,
  em: ({ node, ...props }) => <em className="blog-markdown-em" {...props} />,
}

export default function BlogPost({ language }: BlogPostProps) {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setError(getTranslation('blogNotFound', language))
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, content, featured_image_url, published_at, created_at')
          .eq('slug', slug)
          .eq('published', true)
          .single()

        if (error) throw error

        if (!data) {
          setError(getTranslation('blogNotFound', language))
        } else {
          setPost(data)
        }
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError(getTranslation('blogNotFound', language))
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, language])

  if (loading) {
    return (
      <section className="blog-post">
        <div className="container">
          <div className="blog-loading">
            <p>{getTranslation('blogLoading', language)}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !post) {
    return (
      <section className="blog-post">
        <div className="container">
          <div className="blog-not-found">
            <h1>{getTranslation('blogNotFound', language)}</h1>
            <p>{error || getTranslation('blogNotFound', language)}</p>
            <Link to="/blog" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
              {getTranslation('blogTitle', language)}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const displayDate = formatDate(post.published_at || post.created_at)

  return (
    <section className="blog-post">
      <div className="container">
        <div className="blog-post-content">
          <div className="blog-post-header">
            <h1 className="blog-post-title">{post.title}</h1>
            {displayDate && <p className="blog-post-meta">{displayDate}</p>}
          </div>
          {post.featured_image_url && (
            <img src={post.featured_image_url} alt={post.title} className="blog-post-image" />
          )}
          <div className="blog-post-body">
            <ReactMarkdown 
              components={markdownComponents}
              rehypePlugins={[rehypeSanitize]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  )
}
