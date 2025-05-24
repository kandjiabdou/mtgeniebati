import { useEffect } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  useEffect(() => {
    document.title = "MT GENIE BATI - Votre projet clé en main avec la qualité avant tout";
  }, []);

  return (
    <div className="pt-16">
      <Hero />
      <Services />
      <WhyChooseUs />
      
      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Prêt à démarrer votre projet ?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Appelez-nous
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Demander un devis
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
