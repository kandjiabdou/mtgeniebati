import { motion } from "framer-motion";
import { CheckCircle, Award, Heart } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Service Complet",
    description: "De la conception à la livraison, nous gérons l'intégralité de votre projet.",
    gradient: "from-primary to-blue-600",
    iconColor: "text-primary"
  },
  {
    icon: Award,
    title: "Normes Pro",
    description: "Respect strict des normes professionnelles du bâtiment.",
    gradient: "from-accent to-orange-600",
    iconColor: "text-accent"
  },
  {
    icon: Heart,
    title: "Satisfaction Client",
    description: "Votre satisfaction est notre priorité absolue.",
    gradient: "from-green-500 to-emerald-600",
    iconColor: "text-green-500"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi nous choisir ?</h2>
          <p className="text-xl text-gray-600">Pas besoin d'engager d'autres entrepreneurs</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`text-center p-8 rounded-xl bg-gradient-to-br ${feature.gradient} text-white transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="opacity-90">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
