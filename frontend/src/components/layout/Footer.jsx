import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, Globe, MessageCircle, ExternalLink } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/datasets', label: 'Datasets' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const socialLinks = [
  { icon: Globe, href: '#', label: 'GitHub' },
  { icon: ExternalLink, href: '#', label: 'Twitter' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="border-t border-border bg-surface-alt"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-text-primary font-bold text-lg mb-3">
              <Code2 className="h-5 w-5 text-primary" />
              <span>RepoHub</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Explore GitHub intelligence. Browse, search, and analyze code datasets from
              open-source repositories.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">Navigation</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-soft transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} RepoHub. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
