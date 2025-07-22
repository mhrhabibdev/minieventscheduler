
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <span className="text-primary text-xl font-bold">Eventify </span>
          <p className="text-sm text-muted-foreground">
            Streamline your event management with our intuitive scheduling platform.
          </p>

        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">All Events</Link></li>
            <li><Link to="/manage-events" className="text-muted-foreground hover:text-foreground transition-colors">Manage Events</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
            <li><Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> Sylhet, Bangladesh
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" /> +8801749959977
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" /> mhrhabibdev@gmail.com
            </li>
            <li className="flex items-center gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between px-4 mx-auto text-sm text-muted-foreground">
          <p>© 2025 Mini Event Scheduler. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}