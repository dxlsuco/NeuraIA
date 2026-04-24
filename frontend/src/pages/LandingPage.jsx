import { motion } from 'framer-motion';
import { 
  HiSparkles, 
  HiHeart, 
  HiUserGroup, 
  HiChatBubbleLeftRight,
  HiShieldCheck,
  HiArrowRight 
} from 'react-icons/hi2';
import { useState } from 'react';

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: HiChatBubbleLeftRight,
      title: "IA Empática",
      description: "Converse com nossa inteligência artificial treinada para ouvir e compreender",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: HiUserGroup,
      title: "Psicólogos Reais",
      description: "Conecte-se com profissionais qualificados quando precisar de apoio humano",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: HiShieldCheck,
      title: "100% Confidencial",
      description: "Suas conversas são privadas e protegidas com criptografia de ponta",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-white to-soft-blue">
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-neura-500 to-neura-600 rounded-2xl flex items-center justify-center">
              <HiSparkles className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-gradient">Neura</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-gray-600 hover:text-neura-600 transition-colors">
              Como funciona
            </a>
            <a href="#recursos" className="text-gray-600 hover:text-neura-600 transition-colors">
              Recursos
            </a>
            <button className="btn-secondary">
              Entrar
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neura-50 rounded-full mb-8"
            >
              <HiSparkles className="text-neura-600" />
              <span className="text-sm font-medium text-neura-700">
                Seu espaço seguro para desabafar
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="text-6xl md:text-7xl font-bold mb-6 text-balance"
            >
              Fale. Desabafe.{' '}
              <span className="text-gradient">Seja ouvido.</span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto text-balance"
            >
              Apoio emocional inteligente disponível 24/7. 
              Converse com nossa IA ou conecte-se com psicólogos profissionais.
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="btn-primary group">
                Começar agora
                <HiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary">
                <HiUserGroup className="inline mr-2" />
                Falar com psicólogo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={fadeIn}
              className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
            >
              {[
                { value: "24/7", label: "Disponível" },
                { value: "100%", label: "Confidencial" },
                { value: "5min", label: "Para começar" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-neura-600">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="recursos" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Como o Neura te ajuda
            </h2>
            <p className="text-xl text-gray-600">
              Tecnologia e humanidade trabalhando juntas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="card group cursor-pointer"
              >
                <div className={`
                  w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} 
                  flex items-center justify-center mb-6
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <feature.icon className="text-2xl text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600">
                  {feature.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredFeature === index ? '100%' : 0 }}
                  className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mt-6`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto card bg-gradient-to-br from-neura-500 to-neura-600 text-white text-center"
        >
          <HiHeart className="text-5xl mx-auto mb-6 animate-pulse" />
          
          <h2 className="text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          
          <p className="text-xl text-neura-50 mb-8">
            Seu primeiro passo para uma mente mais saudável começa aqui.
          </p>
          
          <button className="bg-white text-neura-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
            Iniciar conversa agora
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HiSparkles className="text-neura-500" />
            <span className="font-bold text-neura-600">Neura</span>
          </div>
          <p className="text-sm">
            Apoio emocional inteligente • Feito com 💚 para seu bem-estar
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;