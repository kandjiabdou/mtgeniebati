import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    title: "Maison Contemporaine",
    category: "Construction complète",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Construction d'une maison moderne de 200m² avec terrasse et piscine."
  },
  {
    id: 2,
    title: "Immeuble Résidentiel",
    category: "Gros œuvre et finitions",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Rénovation complète d'un immeuble de 4 étages en centre-ville."
  },
  {
    id: 3,
    title: "Rénovation Intérieure",
    category: "Cuisine et aménagements",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Aménagement moderne d'une cuisine ouverte avec îlot central."
  },
  {
    id: 4,
    title: "Bâtiment Commercial",
    category: "Construction neuve",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Construction d'un centre commercial de 5000m² avec parking."
  },
  {
    id: 5,
    title: "Salle de Bain",
    category: "Carrelage et finitions",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Rénovation complète d'une salle de bain avec douche italienne."
  },
  {
    id: 6,
    title: "Fourniture Matériaux",
    category: "Qualité professionnelle",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "Fourniture de matériaux haut de gamme pour projet résidentiel."
  }
];

export default function Realizations() {
  useEffect(() => {
    document.title = "Nos Réalisations - MGT BatiPro";
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Nos Réalisations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl opacity-90"
          >
            Découvrez quelques-uns de nos projets récents qui témoignent de notre savoir-faire
          </motion.p>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-sm">{project.category}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">
                      {project.category}
                    </p>
                    <p className="text-gray-600">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Chiffres Clés</h2>
            <p className="text-xl text-gray-600">Plus de 15 ans d'expérience à votre service</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Projets réalisés</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <p className="text-gray-600">Années d'expérience</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-green-500 mb-2">98%</div>
              <p className="text-gray-600">Clients satisfaits</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-gray-600">Artisans qualifiés</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
