// File: src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                        <p className="mb-4">We’d love to hear from you! Reach out to us anytime.</p>

                        <div className="space-y-2 mb-4">
                            <p><strong>Address:</strong> 123 Main St, City, Country</p>
                            <p><strong>Phone:</strong> (123) 456-7890</p>
                            <p><strong>Email:</strong> contact@example.com</p>
                        </div>

                        <hr className="border-gray-600 my-4" />

                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Contact Us Form */}
                    <div>
                        <h2 className="text-xl font-bold mb-2">Get In Touch</h2>
                        <form>
                            {/* First Row: Name and Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="p-2 rounded border border-gray-400"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Your Phone"
                                    className="p-2 rounded border border-gray-400"
                                    required
                                />
                            </div>

                            {/* Second Row: Main and Subject */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Main"
                                    className="p-2 rounded border border-gray-400"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="p-2 rounded border border-gray-400"
                                    required
                                />
                            </div>

                            {/* Third Row: Message */}
                            <textarea
                                placeholder="Your Message"
                                className="p-2 rounded border border-gray-400 w-full mb-4"
                                rows="4"
                                required
                            ></textarea>

                            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
