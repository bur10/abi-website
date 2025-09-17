import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '../data/blogPosts';
import { COMPANY_INFO } from '../constants';

const BlogPostPage = () => {
    const { slug } = useParams();
    const post = getBlogPostBySlug(slug);
    const relatedPosts = getRelatedPosts(post?.id, 3);

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Yazısı Bulunamadı</h1>
                    <p className="text-xl text-gray-600 mb-8">Aradığınız blog yazısı mevcut değil.</p>
                    <Link
                        to="/blog"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Blog'a Dön
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href);
            alert('Link kopyalandı!');
        }
    };

    return (
        <>
            <Helmet>
                <title>{post.seoTitle}</title>
                <meta name="description" content={post.seoDescription} />
                <meta name="keywords" content={post.seoKeywords} />
                <meta property="og:title" content={post.seoTitle} />
                <meta property="og:description" content={post.seoDescription} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.adenmanagement.com/blog/${post.slug}`} />
                <meta property="og:image" content={`${window.location.origin}${post.featuredImage}`} />
                <meta property="article:author" content={post.author} />
                <meta property="article:published_time" content={post.publishDate} />
                <meta property="article:section" content={post.category} />
                {post.tags.map((tag, index) => (
                    <meta key={index} property="article:tag" content={tag} />
                ))}
                <link rel="canonical" href={`https://www.adenmanagement.com/blog/${post.slug}`} />

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.excerpt,
                        "image": `https://www.adenmanagement.com${post.featuredImage}`,
                        "author": {
                            "@type": "Organization",
                            "name": post.author,
                            "url": "https://www.adenmanagement.com"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": COMPANY_INFO.name,
                            "url": "https://www.adenmanagement.com",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://www.adenmanagement.com/images/aden-logo.png"
                            }
                        },
                        "datePublished": post.publishDate,
                        "dateModified": post.publishDate,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://www.adenmanagement.com/blog/${post.slug}`
                        },
                        "keywords": post.tags.join(", "),
                        "articleSection": post.category,
                        "wordCount": post.content.split(' ').length,
                        "timeRequired": post.readTime
                    })}
                </script>
            </Helmet>

            <div className="min-h-screen bg-gray-50 pt-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Blog'a Dön
                        </Link>
                    </div>

                    {/* Article Header */}
                    <article className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Featured Image */}
                        <div className="aspect-w-16 aspect-h-9">
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-64 md:h-80 object-cover"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="p-8">
                            {/* Category */}
                            <div className="mb-4">
                                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {post.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-6 mb-6">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    {post.author}
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {formatDate(post.publishDate)}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {post.readTime}
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                >
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Paylaş
                                </button>
                            </div>

                            {/* Excerpt */}
                            <div className="text-xl text-gray-600 mb-8 leading-relaxed">
                                {post.excerpt}
                            </div>

                            {/* Article Content */}
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiketler</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">İlgili Yazılar</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <article key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={relatedPost.featuredImage}
                                                alt={relatedPost.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-3">
                                                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                                    {relatedPost.category}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                                <Link
                                                    to={`/blog/${relatedPost.slug}`}
                                                    className="hover:text-blue-600 transition-colors duration-200"
                                                >
                                                    {relatedPost.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Hizmetlerimizden Yararlanmak İster misiniz?
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Uzman ekibimizle iletişime geçin ve ihtiyaçlarınıza uygun en iyi çözümü bulun.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`tel:${COMPANY_INFO.phone}`}
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                            >
                                Hemen Ara: {COMPANY_INFO.phone}
                            </a>
                            <a
                                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                            >
                                WhatsApp ile İletişim
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPostPage;
