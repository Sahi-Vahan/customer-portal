import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  Car,
  ChevronRight
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../../data/blogData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Structured JSON-LD Schema for Google & AI Agent Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.metaDescription,
    'keywords': post.keywords.join(', '),
    'datePublished': post.publishedDate,
    'dateModified': post.updatedDate,
    'inLanguage': 'en-IN',
    'image': `https://sahivahan.com${post.featuredImage}`,
    'author': {
      '@type': 'Person',
      'name': post.author.name,
      'jobTitle': post.author.role
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'SahiVahan',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://sahivahan.com/images/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://sahivahan.com/blog/${post.slug}`
    },
    'articleBody': post.contentSections.map(s => `${s.heading}: ${s.paragraphs.join(' ')}`).join(' ')
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://sahivahan.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://sahivahan.com/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
        'item': `https://sahivahan.com/blog/${post.slug}`
      }
    ]
  };

  return (
    <article className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Schema.org Injections */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-emerald-500 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/blog" className="hover:text-emerald-500 transition">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{post.category}</span>
      </nav>

      {/* Header Section with Generous Room & Refined Hierarchy */}
      <header className="space-y-5 max-w-5xl pt-1 pb-2">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="teal" size="md">{post.category}</Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {post.readTime}
          </span>
          <span className="text-xs text-slate-300 dark:text-slate-700">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Published {post.publishedDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.24]">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-4xl">
          {post.subtitle}
        </p>

        {/* Author Bio Bar & Share */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#154D3F] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {post.author.avatarInitials}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {post.author.name}
                <span className="inline-block w-3.5 h-3.5 rounded-full bg-emerald-500 text-white text-[9px] text-center leading-[14px]">✓</span>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{post.author.role}</p>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#12181E] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            {copied ? 'Link Copied!' : 'Share Guide'}
          </button>
        </div>
      </header>

      {/* Featured Banner Image */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl max-h-[460px]">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-full object-cover object-center max-h-[460px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 right-6 text-white text-xs text-slate-200/90 font-mono hidden sm:block">
          SahiVahan Diagnostic Dossier • Verified Technical Inspection Advisory
        </div>
      </div>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Article Body (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Key Takeaways Box (Designed for AI and fast skimmers) */}
          <section className="bg-gradient-to-br from-[#E8F5EE] to-[#F0FAF4] dark:from-[#0F382E]/40 dark:to-[#0A261F]/60 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wider">
                Key Diagnostic Takeaways (TL;DR)
              </h2>
            </div>
            <ul className="space-y-3">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">
                    ✓
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Article Detailed Sections */}
          <div className="space-y-12">
            {post.contentSections.map(section => (
              <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <span className="w-1.5 h-5 rounded-full bg-[#154D3F] dark:bg-emerald-400 inline-block" />
                    <span>{section.heading}</span>
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Callout Box if present */}
                {section.callout && (
                  <div className={`p-5 rounded-2xl border ${
                    section.callout.type === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/50 text-amber-900 dark:text-amber-200'
                      : section.callout.type === 'info'
                      ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700/50 text-blue-900 dark:text-blue-200'
                      : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/50 text-emerald-900 dark:text-emerald-200'
                  } space-y-1.5`}>
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                      {section.callout.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-600" /> : <Info className="w-4 h-4 text-emerald-600" />}
                      <span>{section.callout.title}</span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-95">
                      {section.callout.text}
                    </p>
                  </div>
                )}

                {/* Data Table if present */}
                {section.dataTable && (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mt-4">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#154D3F] text-white">
                        <tr>
                          {section.dataTable.headers.map((th, thIdx) => (
                            <th key={thIdx} className="p-3.5 font-bold">{th}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#12181E]">
                        {section.dataTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`p-3.5 ${cIdx === 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* AI / Google Search FAQ Accordion Section */}
          <section id="faqs" className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6 scroll-mt-24">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-bold">Frequently Asked Technical Questions</h2>
            </div>

            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Author Card Footer */}
          <div className="p-6 rounded-3xl bg-slate-100 dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#154D3F] text-white flex items-center justify-center font-bold text-lg shrink-0">
              {post.author.avatarInitials}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{post.author.name}</span>
                <Badge variant="teal">Verified Specialist</Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{post.author.role}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Table of Contents */}
            <div className="bg-white dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3 shadow-sm">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Table of Contents
              </span>
              <ul className="space-y-2 text-xs">
                {post.tableOfContents.map(toc => (
                  <li key={toc.id}>
                    <a 
                      href={`#${toc.id}`}
                      className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition block py-1 font-medium hover:translate-x-1 duration-200"
                    >
                      {toc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sticky Lead Capture Widget */}
            <div className="bg-gradient-to-br from-[#0F382E] via-[#154D3F] to-[#0A261F] text-white rounded-3xl p-6 space-y-4 shadow-xl border border-emerald-700/40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Book Diagnostic Inspection
                </span>
              </div>
              
              <h3 className="text-lg font-bold leading-snug">
                Inspecting a used car or motorcycle?
              </h3>
              
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Get an unbiased SahiVahan engineer with ultrasonic paint gauge and OBD scan at the seller's doorstep in 2 hours.
              </p>

              <div className="pt-2 space-y-2">
                <Link to="/book/vehicle" className="block">
                  <Button variant="white" size="md" className="w-full font-extrabold shadow-md">
                    Book Car Inspection (₹1,999)
                  </Button>
                </Link>
                <Link to="/book/vehicle" className="block">
                  <Button variant="glass" size="md" className="w-full font-bold">
                    Book Bike Inspection (₹999)
                  </Button>
                </Link>
              </div>

              <div className="pt-2 border-t border-emerald-800/40 text-[11px] text-emerald-200/80 flex items-center justify-between">
                <span>100% Unbiased</span>
                <span>•</span>
                <span>200+ Audit Points</span>
                <span>•</span>
                <span>PDF Report</span>
              </div>
            </div>

          </div>
        </aside>
      </div>

      {/* Related Forensic Guides */}
      <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Related Vehicle Forensic Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map(related => (
            <Link 
              key={related.slug}
              to={`/blog/${related.slug}`}
              className="bg-white dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Badge variant="teal">{related.category}</Badge>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug">
                  {related.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {related.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <span>{related.readTime}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition">Read <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};
