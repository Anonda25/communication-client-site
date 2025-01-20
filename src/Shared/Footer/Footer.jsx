import React from "react";
import { FaFacebookMessenger, FaWhatsapp, FaSlack, FaDiscord } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {/* About Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">About Us</h3>
                    <p className="text-sm">
                        Our platform enables seamless communication, bringing people together to share ideas, connect, and collaborate. Whether for personal or professional needs, we make communication simple and effective.
                    </p>
                </div>

                {/* Features Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <ul>
                        <li>
                            <a href="/" className="text-sm hover:underline">
                                Instant Messaging
                            </a>
                        </li>
                        <li>
                            <a href="/" className="text-sm hover:underline">
                                Video Conferencing
                            </a>
                        </li>
                        <li>
                            <a href="/" className="text-sm hover:underline">
                                Team Collaboration
                            </a>
                        </li>
                        <li>
                            <a href="/" className="text-sm hover:underline">
                                Customer Support
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
                    <p className="text-sm mb-3">
                        Join our community and stay updated with the latest news and features.
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="https://www.messenger.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaFacebookMessenger size={20} />
                        </a>
                        <a
                            href="https://www.whatsapp.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaWhatsapp size={20} />
                        </a>
                        <a
                            href="https://slack.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaSlack size={20} />
                        </a>
                        <a
                            href="https://discord.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaDiscord size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} Communication Platform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
