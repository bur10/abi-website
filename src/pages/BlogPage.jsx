import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Search, Filter } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogPosts';
import { COMPANY_INFO, BLOG_SEO_META } from '../constants';
import { createSlug } from '../utils';

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredPosts, setFilteredPosts] = useState(
        BLOG_POSTS.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    );

    useEffect(() => {
        let filtered = BLOG_POSTS;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => {
                const categorySlug = createSlug(post.category);
                return categorySlug === selectedCategory;
            });
        }

        // Sort by date in descending order (newest first)
        filtered = filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

        setFilteredPosts(filtered);
    }, [searchTerm, selectedCategory]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Helmet>
                <title>{BLOG_SEO_META.title}</title>
                <meta name="description" content={BLOG_SEO_META.description} />
                <meta name="keywords" content={BLOG_SEO_META.keywords} />
                <meta name="author" content={BLOG_SEO_META.author} />
                <meta name="viewport" content={BLOG_SEO_META.viewport} />
                <meta name="language" content={BLOG_SEO_META.language} />
                <meta name="robots" content={BLOG_SEO_META.robots} />
                <meta property="og:title" content={BLOG_SEO_META.title} />
                <meta property="og:description" content={BLOG_SEO_META.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${window.location.origin}/blog`} />
                <link rel="canonical" href={`${window.location.origin}/blog`} />
            </Helmet>

            <div className="min-h-screen bg-gray-50 pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Blog
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            İzmir ve Torbalı'da temizlik hizmetleri, site yönetimi ve personel temini hakkında
                            güncel bilgiler, ipuçları ve uzman görüşleri.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Blog yazılarında ara..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">Tüm Kategoriler</option>
                                    {BLOG_CATEGORIES.map(category => (
                                        <option key={category.id} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                {/* Featured Image */}
                                <div className="aspect-w-16 aspect-h-9">
                                    <img
                                        src={post.featuredImage}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Category */}
                                    <div className="mb-3">
                                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                            {post.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="hover:text-blue-600 transition-colors duration-200"
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 mr-1" />
                                            {post.author}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {formatDate(post.publishDate)}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {post.tags.slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Search className="h-16 w-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Aradığınız kriterlere uygun blog yazısı bulunamadı
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Farklı anahtar kelimeler veya kategoriler deneyebilirsiniz.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                }}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Filtreleri Temizle
                            </button>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Hizmetlerimiz Hakkında Daha Fazla Bilgi Alın
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

export default BlogPage;
