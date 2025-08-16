import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Sun, Moon } from "lucide-react";

// Note: This component assumes that the required dependencies like 'lucide-react',
// 'framer-motion', and '@/components/ui/card' (from shadcn/ui) are installed
// and configured in your project.

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const skills = [
    "Data Analysis",
    "Data Visualization",
    "Python",
    "Machine Learning",
    "AI",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Scikit-Learn",
    "SQL",
    "Power BI",
    "IBM Cognos Analytics",
    "C",
    "C++",
    "Statistical Analysis",
    "Predictive Modeling",
    "Streamlit"
  ];

  const certifications = [
    { name: "Google Foundations: Data, Data, Everywhere", desc: "Completed coursework on Data fundamentals and analysis.", link: "https://www.coursera.org/account/accomplishments/verify/YF5S34ZHGQRL" },
    { name: "Data Science at Scale", desc: "Completed coursework on data science and machine learning at scale.", link: "https://www.coursera.org/account/accomplishments/specialization/WGNDKO0L5H7A" },
    { name: "Introduction to Data Analytics", desc: "Learned about data analytics concepts and processes.", link: "https://www.coursera.org/account/accomplishments/verify/GPBSVLE4QBSC" },
    { name: "Tableau Business Intelligence Analyst", desc: "Completed the professional certificate to become a Tableau business intelligence analyst.", link: "https://www.coursera.org/account/accomplishments/professional-cert/IP4A1AJYMNY9" },
    { name: "PwC Power BI Virtual Case Experience Program", desc: "Built interactive dashboards and reports using Power BI.", link: "https://www.linkedin.com/feed/update/urn:li:activity:7165641406575824898/" },
    { name: "SQL for Data Science", desc: "Learned SQL for data querying and analysis.", link: "https://coursera.org/share/61ed0297e4bd2c36c32e0cb470c08349" },
    { name: "Programming in C++: A Hands-on Introduction", desc: "Gained foundational knowledge in C++ programming and OOPS concepts.", link: "https://www.coursera.org/account/accomplishments/specialization/JPNNHNE8ZE8L" },
    { name: "IBM NoSQL, Big Data, and Spark Foundations", desc: "Gained knowledge in NoSQL, big data, and Spark fundamentals.", link: "https://www.coursera.org/account/accomplishments/specialization/7363WC859KVP" },
    { name: "SQL HackerEarth", desc: "Demonstrated proficiency in SQL querying through a HackerEarth assessment.", link: "https://www.hackerrank.com/certificates/cd904d85f80c" }
  ];

  const projects = [
    { title: "Retail Chain Insights Dashboard", desc: "Designed a dashboard to analyze sales, inventory, and customer insights for retail chains using Power BI and SQL.", link: "https://app.powerbi.com/view?r=eyJrIjoiMzdlMTEzMWMtMTFmYi00MWI3LTk3ZjEtM2E0YjkzZTk5NTc0IiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9" },
    { title: "No-Code Data Cleaning Tool", desc: "Built a user-friendly tool to clean and preprocess datasets without writing code, using Python and Streamlit.", link: "https://datacleaningapp-by-aekansh.streamlit.app/" },
    { title: "Streaming Platform Netflix Analytics System", desc: "Developed an analytics system for streaming platforms to track user engagement, ratings, and content popularity.", link: "https://github.com/aekanshkhandelwal/Netflix_Movie_Show_Analysis_Using_SQL" },
    { title: "ML Model for Spam Detection", desc: "Built using Python (Jan-Feb 2024). Classified SMS/Emails into spam and ham using supervised learning techniques.", link: "https://email-smsspam-classifier-by-aekansh.streamlit.app/" },
    { title: "Movie Recommender System", desc: "Developed a personalized movie recommendation system to enhance user engagement using ML algorithms.", link: "https://github.com/aekanshkhandelwal/Movie_recommendation_System" },
    { title: "Interactive Dashboard for Video Games Sales Data", desc: "Developed using Power BI & SQL (Mar-Apr 2024). Analyzed and visualized sales data with insights on trends and patterns.", link: "https://app.powerbi.com/view?r=eyJrIjoiZDQ3NmMyMjEtMzAwNC00N2UyLTgzODUtZmI5MjFkZGM4YjBhIiwidCI6IjM0YmQ4YmVkLTJhYzEtNDFhZS05ZjA4LTRlMGEzZjExNzA2YyJ9" },
    { title: "Social Media Platform (Prototype)", desc: "Built a 2-user Python app allowing photo sharing, likes, comments, and messaging.", link: "https://github.com/aekanshkhandelwal/social_media_platform" },
    { title: "Library Management System", desc: "Created in C++ (Aug-Nov 2023). Managed records of books and students with separate admin & student interfaces.", link: "https://github.com/aekanshkhandelwal/Library-Management-System-in-C" }
  ];

  const education = [
    { school: "Chandigarh University", degree: "B.E.-CSE(H) BIG DATA ANALYTICS", location: "Mohali", link: "https://www.cuchd.in/" },
    { school: "Frame International School", degree: "CBSE", location: "Rajasthan", link: "https://frameinternationalschool.com/" },
    { school: "Shree Ashram The International School", degree: "CBSE", location: "Rajasthan", link: "http://www.ashramschooldausa.com/" }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };
  
  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.8, ease: "easeOut" } }
  };

  // New variants for a slide-in heading animation
  const headerVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: "tween", duration: 0.6, ease: "easeOut" } }
  };
  
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.5 } }
  };

  return (
    <div className={`font-inter min-h-screen transition-colors duration-500
      ${darkMode ? 'bg-slate-950 text-gray-100 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-bg-dark' : 'bg-blue-50 text-gray-900 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 animate-bg-light'}`}>

      {/* Tailwind CSS keyframes for animated background */}
      <style>{`
        @keyframes bg-light {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bg-dark {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-bg-light {
          background-size: 400% 400%;
          animation: bg-light 15s ease infinite;
        }
        .animate-bg-dark {
          background-size: 400% 400%;
          animation: bg-dark 15s ease infinite;
        }
      `}</style>

      {/* Navigation Bar */}
      <motion.nav 
        className={`sticky top-0 z-50 w-full px-4 md:px-10 py-4 shadow-xl transition-colors duration-500 rounded-b-3xl ${darkMode ? 'bg-emerald-950 bg-opacity-80 backdrop-filter backdrop-blur-lg' : 'bg-cyan-100 bg-opacity-80 backdrop-filter backdrop-blur-lg'}`}
        variants={navVariants}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-wrap justify-center items-center">
          <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8 text-xl font-bold">
            <motion.li variants={linkVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => scrollToSection('education')} className={`hover:text-cyan-500 transition-colors duration-300 ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>Education</button>
            </motion.li>
            <motion.li variants={linkVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => scrollToSection('projects')} className={`hover:text-cyan-500 transition-colors duration-300 ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>Projects</button>
            </motion.li>
            <motion.li variants={linkVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => scrollToSection('skills')} className={`hover:text-cyan-500 transition-colors duration-300 ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>Skills</button>
            </motion.li>
            <motion.li variants={linkVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => scrollToSection('certifications')} className={`hover:text-cyan-500 transition-colors duration-300 ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>Certifications</button>
            </motion.li>
            <motion.li variants={linkVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <a href="https://drive.google.com/file/d/1WsYcwSYXFvlJouJKvpd23BJwXG3SvC_l/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={`hover:text-cyan-500 transition-colors duration-300 ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>Resume</a>
            </motion.li>
            <motion.li variants={linkVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => scrollToSection('about-me')} className={`hover:text-cyan-500 transition-colors duration-300 ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>About Me</button>
            </motion.li>
            <motion.li variants={linkVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => scrollToSection('contact')} className={`hover:text-cyan-500 transition-colors duration-300 ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>Contact</button>
            </motion.li>
          </ul>
        </div>
      </motion.nav>

      <div className="p-4 sm:p-6 md:p-10">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button onClick={toggleDarkMode} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-700 transition">
            <motion.span whileTap={{ rotate: 360 }}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.span>
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
        
        {/* Header */}
        <header className="text-center mb-10">
          <motion.h1
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gradient-to-r from-blue-600 to-cyan-800'}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Aekansh Khandelwal
          </motion.h1>
          <motion.p
            className={`text-lg sm:text-xl md:text-2xl italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.8 } }}
          >
            Computer Science Engineer in Big Data Analytics
          </motion.p>
        </header>

        {/* Education Section */}
        <section id="education" className="mb-20">
          <motion.h2 
            className={`text-3xl font-bold mb-10 text-center ${darkMode ? 'text-green-400' : 'text-blue-600'}`}
            variants={headerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.75 }}
          >
            Education
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            {education.map((edu, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <Card className={`shadow-2xl rounded-3xl transition duration-300 ${darkMode ? 'bg-slate-800 border border-green-400 hover:shadow-green-400' : 'bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 hover:shadow-blue-400'}`}>
                  <CardContent className={`p-6 text-center text-xl transition-colors duration-300 ${darkMode ? 'text-green-300 hover:text-green-500' : 'text-blue-800 hover:text-cyan-600'}`}>
                    <a href={edu.link} target="_blank" rel="noopener noreferrer" className="font-bold text-2xl block mb-1">
                      {edu.school}
                    </a>
                    <span className="text-lg italic">{edu.degree}</span>
                    <p className="mt-2 text-md">{edu.location}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <h2 
            className={`text-3xl font-bold mb-10 text-center ${darkMode ? 'text-green-400' : 'text-blue-600'}`}
          >
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {projects.map((project, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="h-full">
                <Card className={`h-full flex flex-col justify-between shadow-2xl rounded-3xl transition duration-300 ${darkMode ? 'bg-slate-800 border border-green-400 hover:shadow-green-400' : 'bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 hover:shadow-blue-400'}`}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={`text-2xl font-bold mb-3 inline-block transition-colors duration-300 ${darkMode ? 'text-green-300 hover:text-green-500' : 'text-blue-800 hover:text-cyan-600'}`}>{project.title}</a>
                    <p className={`transition-colors duration-300 flex-grow ${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'}`}>{project.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20">
          <h2 
            className={`text-3xl font-bold mb-10 text-center ${darkMode ? 'text-green-400' : 'text-blue-600'}`}
          >
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-stretch">
            {skills.map((skill, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.1 }} className="h-full">
                <Card className={`h-full flex items-center justify-center shadow-2xl rounded-3xl transition duration-300 ${darkMode ? 'bg-slate-800 border-l-8 border-green-400' : 'bg-gradient-to-r from-blue-100 to-cyan-100 border-l-8 border-blue-400'}`}>
                  <CardContent className={`p-6 text-center font-semibold text-lg ${darkMode ? 'text-green-300 hover:text-green-500' : 'text-blue-800 hover:text-cyan-600'} transition-colors duration-300`}>{skill}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="mb-20">
          <h2 
            className={`text-3xl font-bold mb-10 text-center ${darkMode ? 'text-green-400' : 'text-blue-600'}`}
          >
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {certifications.map((cert, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="h-full">
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="h-full block">
                  <Card className={`h-full flex flex-col justify-between shadow-2xl rounded-3xl transition duration-300 ${darkMode ? 'bg-slate-800 border border-green-400 hover:shadow-green-400' : 'bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 hover:shadow-blue-400'}`}>
                    <CardContent className={`p-6 text-center text-xl transition-colors duration-300 h-full flex flex-col`}>
                      <span className="font-bold text-2xl">{cert.name}</span>
                      <p className="mt-2 text-lg flex-grow">{cert.desc}</p>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Me Section */}
        <section id="about-me" className="mb-20">
          <motion.h2 
            className={`text-3xl font-bold mb-10 text-center ${darkMode ? 'text-green-400' : 'text-blue-600'}`}
            variants={headerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.75 }}
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }}
            className="text-justify mx-auto max-w-3xl"
          >
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              I am Aekansh Khandelwal, a Computer Science Engineering student specializing in Data Analysis, Machine Learning, and AI. I have hands-on experience in developing interactive dashboards, predictive models, and data-driven tools that provide actionable insights. I am passionate about leveraging technology and analytics to solve real-world problems, combining technical expertise, creativity, and a results-oriented mindset to deliver impactful projects. My work spans areas such as Python, SQL, Power BI, Streamlit, and AI-driven applications, enabling me to turn complex data into meaningful insights.
            </p>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center mb-20">
          <motion.h2 
            className={`text-3xl font-bold mb-6 ${darkMode ? 'text-green-400' : 'text-blue-600'}`}
            variants={headerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.75 }}
          >
            Contact
          </motion.h2>
          <motion.div
            className="flex justify-center space-x-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div variants={itemVariants} whileHover={{ scale: 1.2 }}>
              <a href="https://github.com/aekanshkhandelwal" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${darkMode ? 'text-green-300 hover:text-green-500' : 'text-blue-800 hover:text-cyan-600'}`}>
                <Github className="w-12 h-12" />
              </a>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.2 }}>
              <a href="https://www.linkedin.com/in/aekansh-khandelwal-780029231/" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${darkMode ? 'text-green-300 hover:text-green-500' : 'text-blue-800 hover:text-cyan-600'}`}>
                <Linkedin className="w-12 h-12" />
              </a>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.2 }}>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=khandelwalaekansh@gmail.com" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 ${darkMode ? 'text-green-300 hover:text-green-500' : 'text-blue-800 hover:text-cyan-600'}`}>
                <Mail className="w-12 h-12" />
              </a>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
