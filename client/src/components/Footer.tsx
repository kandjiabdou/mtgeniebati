import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">MT GENIE BATI</h3>
            <p className="text-gray-300 mb-6">
              Votre partenaire de confiance pour tous vos projets de construction et rénovation. 
              La qualité avant tout !
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Maçonnerie</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Menuiserie</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Peinture</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Carrelage</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">CGV</a></li>
              <li><Link href="/" className="hover:text-white transition-colors duration-200">Plan du site</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MT GENIE BATI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
