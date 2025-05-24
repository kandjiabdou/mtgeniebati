import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Hammer, 
  Square, 
  Brush, 
  Grid3X3, 
  Triangle, 
  Layers, 
  ShoppingCart, 
  Hexagon 
} from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "Maçonnerie",
    description: "Construction et rénovation de structures en béton, pierre et brique."
  },
  {
    icon: Square,
    title: "Menuiserie Aluminium",
    description: "Fenêtres, portes et structures aluminium sur mesure."
  },
  {
    icon: Brush,
    title: "Peinture",
    description: "Peinture intérieure et extérieure avec finitions professionnelles."
  },
  {
    icon: Grid3X3,
    title: "Carrelage",
    description: "Pose de carrelage et revêtements pour sols et murs."
  },
  {
    icon: Triangle,
    title: "Charpente",
    description: "Construction et rénovation de charpentes traditionnelles et industrielles."
  },
  {
    icon: Layers,
    title: "Décoration BA13",
    description: "Cloisons, faux plafonds et aménagements intérieurs."
  },
  {
    icon: ShoppingCart,
    title: "Vente de Matériel",
    description: "Fourniture de matériaux de construction de qualité."
  },
  {
    icon: Hexagon,
    title: "Pavage",
    description: "Aménagements extérieurs et revêtements de sol."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Prestations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une expertise complète pour tous vos projets de construction et rénovation
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="service-card h-full bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
