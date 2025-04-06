// components/SocialLinks.tsx
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function SocialLinks() {
    return (
        <div className="flex space-x-4 mt-4">
            <a href="https://linkedin.com" target="_blank" className="text-2xl hover:text-blue-400">
                <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" className="text-2xl hover:text-gray-400">
                <FaGithub />
            </a>
            <a href="https://twitter.com" target="_blank" className="text-2xl hover:text-blue-300">
                <FaTwitter />
            </a>
        </div>
    );
}