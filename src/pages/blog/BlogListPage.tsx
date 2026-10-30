import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Car, 
  Bike, 
  AlertTriangle, 
  FileCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../../data/blogData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const BlogListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Scam Alerts', 'Car Inspection', 'Bike Inspection', 'Diagnostics & Tech', 'Legal & Paperwork', 'Buying Guide'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  // Schema.org Structured Data for AI & Search Engine discovery
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'SahiVahan Automotive Inspection Knowledge Hub',
    'description': 'Authoritative technical guides, scam warnings, and checklists for used car and bike buyers in India.',
    'url': 'https://sahivahan.com/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'SahiVahan',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://sahivahan.com/images/logo.png'
      }
    },
    'blogPost': BLOG_POSTS.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.metaDescription,
      'datePublished': post.publishedDate,
      'dateModified': post.updatedDate,
      'author': {
        '@type': 'Person',
        'name': post.author.name
      },
      'url': `https://sahivahan.com/blog/${post.slug}`
    }))
  };

  return (
    <div className="space-y-12 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SEO Schema Injection */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F382E] via-[#154D3F] to-[#0A261F] text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" /> SahiVahan Knowledge Hub & AI Research
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Used Vehicle Intelligence & Buyer Advisory
          </h1>
          
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Unbiased forensic guides, scam detection tutorials, ultrasonic paint benchmarks, and legal transfer advice engineered by certified automotive diagnostic specialists.
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-emerald-300 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics (e.g. odometer fraud, flood damage, paint meter, RC transfer)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-black/40 backdrop-blur-md border border-emerald-500/30 rounded-2xl text-white placeholder-emerald-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#154D3F] text-white shadow-md shadow-emerald-950/20 dark:bg-emerald-600'
                : 'bg-white dark:bg-[#12181E] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article (When on 'All' & No active search) */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <div className="bg-white dark:bg-[#12181E] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 relative overflow-hidden min-h-[280px]">
              <img 
                src={featuredPost.featuredImage} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="teal">★ FEATURED FORENSIC REPORT</Badge>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{featuredPost.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.publishedDate}</span>
                </div>

                <Link to={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {featuredPost.subtitle}
                </p>

                {/* Quick Key Takeaways Preview */}
                <div className="bg-slate-50 dark:bg-[#0A0E12] p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Key Diagnostic Insight
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {featuredPost.keyTakeaways[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#154D3F] text-white flex items-center justify-center text-xs font-bold">
                    {featuredPost.author.avatarInitials}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{featuredPost.author.name}</p>
                    <p className="text-[10px] text-slate-500">{featuredPost.author.role}</p>
                  </div>
                </div>

                <Link to={`/blog/${featuredPost.slug}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Read Article
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {selectedCategory === 'All' ? 'All Published Forensic Guides' : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#12181E] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No guides found matching your query.</p>
            <Button variant="outline" size="sm" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article 
                key={post.slug}
                className="bg-white dark:bg-[#12181E] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-emerald-300 border border-white/10">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.publishedDate}</span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {post.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#154D3F] text-white flex items-center justify-center text-[10px] font-bold">
                      {post.author.avatarInitials}
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">{post.author.name}</span>
                  </div>

                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-xs font-bold text-[#154D3F] dark:text-emerald-400 flex items-center gap-1 hover:underline"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Conversion Prompt */}
      <div className="bg-[#12181E] border border-emerald-900/40 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <Badge variant="teal">Doorstep Certified Inspections</Badge>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Found a used car or bike you like? Don't buy blind.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Our diagnostic specialists arrive at any seller location in under 2 hours with ultrasonic paint gauges and OBD scanners. Protect yourself from lemon vehicles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link to="/book/vehicle">
            <Button variant="white" size="lg" className="font-extrabold shadow-lg">
              Book Inspection Now
            </Button>
          </Link>
          <Link to="/sample-report">
            <Button variant="glass" size="lg" className="font-bold">
              View Sample Report
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
