import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });

  useEffect(() => {
    document.title = "Contact - MGT BatiPro";
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous recontacterons très bientôt.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        projectType: "",
        message: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message || !formData.projectType) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            Contactez-nous
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl opacity-90"
          >
            Nous sommes là pour répondre à toutes vos questions et réaliser votre projet
          </motion.p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section id="contact" className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Formulaire de contact</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2">
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Votre prénom"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Votre nom"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2">
                        Type de projet *
                      </Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de projet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction-neuve">Construction neuve</SelectItem>
                          <SelectItem value="renovation">Rénovation</SelectItem>
                          <SelectItem value="extension">Extension</SelectItem>
                          <SelectItem value="amenagement-interieur">Aménagement intérieur</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Décrivez votre projet..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Adresse</h4>
                        <p className="text-gray-600">Thies Sénégal</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Téléphone</h4>
                        <p className="text-gray-600">+221 78 422 63 31</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">massatacisse@mtgeniebati.com</p>
                      </div>
                    </div>
                    

                  </div>
                </CardContent>
              </Card>
              
              {/* Map Placeholder */}
              <Card className="bg-gray-100 h-64 flex items-center justify-center shadow-lg">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Carte Google Maps</p>
                  <p className="text-sm">Intégration à venir</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
