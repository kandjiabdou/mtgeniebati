import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Clock, ShieldCheck } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "À propos - MGT BatiPro";
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
            À propos de MGT BatiPro
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl opacity-90"
          >
Votre partenaire de confiance pour des réalisations de qualité
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <p className="text-lg text-gray-600 mb-6">
MGT BatiPro s'est imposée comme un acteur incontournable de la construction et de la rénovation 
                grâce à la qualité exceptionnelle de ses réalisations.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Notre philosophie repose sur l'excellence, la qualité et la satisfaction client. Nous croyons 
                que chaque projet mérite une attention particulière et un savoir-faire professionnel.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Équipe expérimentée</h4>
                    <p className="text-gray-600">Artisans qualifiés et certifiés</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Respect des délais</h4>
                    <p className="text-gray-600">Livraison dans les temps convenus</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Garantie qualité</h4>
                    <p className="text-gray-600">Travaux garantis et certifiés</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Équipe MGT BatiPro" 
                className="rounded-xl shadow-2xl w-full" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-white">98%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Satisfaction client</p>
                    <p className="text-gray-600">Qualité garantie</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600">Ce qui nous guide au quotidien</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">Q</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualité</h3>
              <p className="text-gray-600">
                Nous utilisons uniquement des matériaux de première qualité et appliquons 
                les meilleures techniques du métier.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">F</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fiabilité</h3>
              <p className="text-gray-600">
                Respect des délais, des budgets et des engagements pris. 
                Vous pouvez compter sur nous.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">I</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Nous restons à la pointe des nouvelles technologies et techniques 
                de construction pour vous offrir le meilleur.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
