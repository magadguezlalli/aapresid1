import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie
} from "recharts";

// ─── PALETTE ───────────────────────────────────────────────────────────────
const C1 = "#D4500A";
const C2 = "#F07832";
const C3 = "#E8C030";
const C4 = "#D4A850";
const C5 = "#E8C878";
const C6 = "#F5E6B4";
const PALETTE = [C1, C2, C3, C4, C5, C6];
const BG = "#FDFAF4";
const DARK = "#2C1A00";
const CARD_BG = "#FFFFFF";

// ─── VISION 10 AÑOS — conteo real de respuestas ────────────────────────────
const VISION_WORDS = [
  { text: "Red de innovación en sustentabilidad", count: 54 },
  { text: "Espacio de articulación ciencia-sociedad", count: 40 },
  { text: "Referencia técnica siembra directa", count: 5 },
  { text: "Bioeconomía y tecnologías digitales", count: 1 },
  { text: "Referencia en sistemas agropecuarios", count: 1 },
  { text: "Herramientas para productividad sustentable", count: 1 },
  { text: "Trabajo en equipo y comunicación", count: 1 },
  { text: "Oportunidades para productores", count: 1 },
];

// ─── WORD CLOUD DATA ───────────────────────────────────────────────────────
const WORDS = [
  { text:"Sustentabilidad", count:30 },
  { text:"Innovación", count:25 },
  { text:"Regeneración", count:7 },
  { text:"Sostenibilidad", count:6 },
  { text:"Suelo", count:3 },
  { text:"Conservación", count:2 },
  { text:"Sistema", count:2 },
  { text:"Productor", count:2 },
  { text:"Resiliencia", count:2 },
  { text:"Red", count:1 },
  { text:"Reciprocidad", count:1 },
  { text:"Vanguardia", count:1 },
  { text:"Desafío", count:1 },
  { text:"Excelencia", count:1 },
  { text:"Referente", count:1 },
  { text:"Naturaleza", count:1 },
  { text:"Integrar", count:1 },
  { text:"Conocimiento", count:1 },
  { text:"Horizontalidad", count:1 },
  { text:"Equipo", count:1 },
  { text:"Ciencia", count:1 },
  { text:"Autenticidad", count:1 },
  { text:"Sinergia", count:1 },
  { text:"Conciencia", count:1 },
  { text:"Diferenciación", count:1 },
  { text:"Prestigio", count:1 },
  { text:"Integración", count:1 },
  { text:"Comunidad", count:1 },
];

const IDENTITY_BY_IDX = {"0":"Sustentabilidad","1":"Suelo","2":"Red","3":"Sustentabilidad","4":"Regeneración","5":"Conservación","6":"Sistema","7":"Reciprocidad","8":"Vanguardia","9":"Innovación","10":"Innovación","11":"Regeneración","12":"Innovación","13":"Sustentabilidad","14":"Innovación","15":"Innovación","16":"Innovación","17":"Sostenibilidad","18":"Sostenibilidad","19":"Sustentabilidad","20":"Desafío","21":"Productor","22":"Excelencia","23":"Sustentabilidad","24":"Innovación","25":"Sustentabilidad","26":"Innovación","27":"Sustentabilidad","28":"Innovación","29":"Innovación","30":"Innovación","31":"Sustentabilidad","32":"Innovación","33":"Referente","34":"Naturaleza","35":"Sostenibilidad","36":"Sustentabilidad","37":"Sustentabilidad","38":"Regeneración","39":"Suelo","40":"Sistémica","41":"Innovación","42":"Innovación","43":"Innovación","44":"Innovación","45":"Resiliencia","46":"Innovación","47":"Conservación","48":"Sustentabilidad","49":"Regeneración","50":"Integrar","51":"Innovación","52":null,"53":"Productor","54":"Sustentabilidad","55":"Suelo","56":"Sustentabilidad","57":"Sustentabilidad","58":"Sustentabilidad","59":"Regenerativo","60":"Innovación","61":"Regeneración","62":"Sustentabilidad","63":"Resiliencia","64":"Conjunto","65":"Fiabilidad","66":"Conocimiento","67":"Horizontalidad","68":"Sustentabilidad","69":"Equipo","70":"Sustentabilidad","71":"Innovación","72":"Innovación","73":"Sustentabilidad","74":"Sustentabilidad","75":"Sustentabilidad","76":"Ciencia","77":"Autenticidad","78":"Sustentabilidad","79":"Sinergia","80":"Pioneros","81":"Sustentabilidad","82":"Sostenibilidad","83":"Innovación","84":"Sustentabilidad","85":"Innovación","86":"Sostenibilidad","87":"Innovación","88":"Sustentabilidad","89":"Sustentabilidad","90":"Conciencia","91":"Diferenciación","92":"Sustentología","93":"Prestigio","94":"Integración","95":"Comunidad","96":"Sustentabilidad","97":"Esencia institucional","98":"Regenerativo","99":"Sustentabilidad","100":"Tecnología sustentable","101":"Innovación","102":"Sostenibilidad","103":"Aplicabilidad"};

// ─── RAW DATA ──────────────────────────────────────────────────────────────
const RAW = [{"region":null,"rol":"Miembro de la Comisión Directiva","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":5.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":4.0,"Certificaciones":5.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED","INNOVACIÓN Y ADAPTABILIDAD"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":null,"rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":5.0},"funciones":{"Representación":3.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":5.0,"Redes articulación":4.0,"Certificaciones":4.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":[],"riesgos":[],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["MALA PRENSA Y REPUTACIÓN","PÉRDIDA DE SOCIOS","CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA","INNOVACIÓN Y ADAPTABILIDAD"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad", "Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":3.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES","MEJORAR E INCORPORAR MÁS GESTIÓN TÉCNICA Y TÉCNOLOGIA"],"participacion":"Sí","factores":["Evolución sistema productivo"]},{"region":"Nodo Litoral","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"Sí","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste Medanoso","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD","MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Centro","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":3.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":4.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD","MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"No","factores":["Contexto económico"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Miembro de la Comisión Directiva","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":5.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","INNOVACIÓN Y ADAPTABILIDAD"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Centro","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD","CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["HORIZONTALIDAD Y MATRICIALIDAD"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"No","factores":["Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Otro","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":3.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":3.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":3.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":2.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":2.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS","PÉRDIDA DE SOCIOS"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Ns/Nc","factores":["Contexto económico"]},{"region":"Nodo Centro","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Mercados internacionales", "Estándares sustentabilidad", "Marco regulatorio", "Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Sur","rol":"Miembro de la Comisión Directiva","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":3.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA","INNOVACIÓN Y ADAPTABILIDAD"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Sí","factores":["Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"No","factores":["Marco regulatorio", "Legitimidad social", "Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Oeste","rol":"Otro","mision":"5. Me representa totalmente","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","INNOVACIÓN Y ADAPTABILIDAD"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Centro","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":3.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":3.0,"Transparencia":4.0,"Diversidad de enfoques":3.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":3.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":3.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":3.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":3.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":3.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["PÉRDIDA DE IDENTIDAD","MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":["MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Sí","factores":["Marco regulatorio", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":5.0,"I+D":5.0,"Certificación":4.0,"Proyección int.":5.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":5.0,"Certificaciones":4.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["BUEN FUNCIONAMIENTO DE LOS PROGRAMAS Y EVENTOS"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"Sí","factores":["Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Gerente o miembro del Staff de AAPRESID","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA","INNOVACIÓN Y ADAPTABILIDAD"],"aspectos_cambiar":["MÁS DIVERSIDAD Y APERTURA"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Integrante de Mesas Técnicas / Chacras","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS","PÉRDIDA DE SOCIOS"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Litoral","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":3.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":5.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Marco regulatorio", "Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Oeste","rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Legitimidad social", "Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Sur","rol":"Presidente Honorario","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":["MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["TRABAJO EN RED","BUEN FUNCIONAMIENTO DE LOS PROGRAMAS Y EVENTOS"],"aspectos_cambiar":["MÁS DIVERSIDAD Y APERTURA"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":3.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS","PÉRDIDA DE SOCIOS"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Mercados internacionales", "Estándares sustentabilidad", "Marco regulatorio", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":4.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS DIVERSIDAD Y APERTURA"],"participacion":"Sí","factores":["Legitimidad social"]},{"region":"Nodo Oeste","rol":"Integrante de Mesas Técnicas / Chacras","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":5.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Marco regulatorio", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Centro","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":3.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD","CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["HORIZONTALIDAD Y MATRICIALIDAD"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL","MEJORAR E INCORPORAR MÁS GESTIÓN TÉCNICA Y TÉCNOLOGIA","MÁS SINERGIA INSTITUCIONAL"],"participacion":"No","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Centro","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":3.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","APERTURA Y PLURALIDAD"],"riesgos":["MALA PRENSA Y REPUTACIÓN","PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES","MÁS DIVERSIDAD Y APERTURA"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":3.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Litoral","rol":"Gerente o miembro del Staff de AAPRESID","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":5.0,"Certificaciones":4.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA","BUEN FUNCIONAMIENTO DE LOS PROGRAMAS Y EVENTOS"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Sí","factores":["Transformaciones tecnológicas"]},{"region":"Nodo Oeste","rol":"Presidente Honorario","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","BUEN FUNCIONAMIENTO DE LOS PROGRAMAS Y EVENTOS","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Sí","factores":["Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","NUEVAS FUENTES DE FINANCIAMIENTO"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Sí","factores":["Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":3.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":3.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":4.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Ns/Nc","factores":["Evolución sistema productivo"]},{"region":"Nodo Centro","rol":"Integrante de Mesas Técnicas / Chacras","mision":"5. Me representa totalmente","satisf":null,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":4.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["HORIZONTALIDAD Y MATRICIALIDAD"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA","MEJORAR E INCORPORAR MÁS GESTIÓN TÉCNICA Y TÉCNOLOGIA"],"participacion":"No","factores":["Mercados internacionales", "Estándares sustentabilidad", "Marco regulatorio", "Legitimidad social"]},{"region":"Nodo Oeste Medanoso","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD","NUEVOS COSTOS Y MAL USO DE RECURSOS"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Sí","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Litoral","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":4.0,"Siembra directa":3.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":[],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Ns/Nc","factores":["Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES","MÁS SINERGIA INSTITUCIONAL"],"participacion":"Ns/Nc","factores":["Marco regulatorio", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Miembro de la Comisión Directiva","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS DIVERSIDAD Y APERTURA"],"participacion":"Sí","factores":["Transformaciones tecnológicas"]},{"region":"Nodo Sur","rol":"Integrante de Mesas Técnicas / Chacras","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Ns/Nc","factores":["Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste Medanoso","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","COMPROMISO Y CAPACIDAD DE EQUIPO TÉCNICO"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad", "Marco regulatorio", "Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Oeste","rol":"Otro","mision":"3. Me representa medianamente","satisf":3.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":3.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"No","factores":["Legitimidad social", "Transformaciones tecnológicas"]},{"region":"Nodo NOA","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":4.0,"Formación/Jóvenes":4.0,"Congreso":4.0},"beneficios":["MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN","APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD","CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","BUEN FUNCIONAMIENTO DE LOS PROGRAMAS Y EVENTOS"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES","MÁS INCENTIVOS A SOCIOS"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo NOA","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":5.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":5.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED","COMPROMISO Y CAPACIDAD DE EQUIPO TÉCNICO"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","REVISIÓN DE LA ESTRATEGIA DE FINANCIAMIENTO"],"participacion":"Ns/Nc","factores":["Mercados internacionales", "Estándares sustentabilidad", "Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste Medanoso","rol":"Miembro de la Comisión Directiva","mision":"5. Me representa totalmente","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Integrante de Mesas Técnicas / Chacras","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":5.0,"Certificaciones":4.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS","PÉRDIDA DE SOCIOS"],"aspectos_pos":["TRABAJO EN RED","COMPROMISO Y CAPACIDAD DE EQUIPO TÉCNICO"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"Sí","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"Ns/Nc","factores":["Mercados internacionales", "Estándares sustentabilidad", "Legitimidad social", "Transformaciones tecnológicas"]},{"region":"Nodo Oeste","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":2.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","REVISIÓN DE LA ESTRATEGIA DE FINANCIAMIENTO"],"participacion":"Ns/Nc","factores":["Marco regulatorio", "Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Otro","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad"]},{"region":"Nodo Centro","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":3.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":3.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":3.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":3.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":["MALA PRENSA Y REPUTACIÓN","CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE","MÁS DIVERSIDAD Y APERTURA"],"participacion":"Ns/Nc","factores":["Marco regulatorio", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste Medanoso","rol":"Gerente o miembro del Staff de AAPRESID","mision":"3. Me representa medianamente","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":3.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA","COMPROMISO Y CAPACIDAD DE EQUIPO TÉCNICO"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA","MEJORAR E INCORPORAR MÁS GESTIÓN TÉCNICA Y TÉCNOLOGIA"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Otro","mision":"4. Me representa bastante","satisf":3.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":3.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":3.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"No","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo NOA","rol":"Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":3.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":4.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN","APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","BUEN FUNCIONAMIENTO DE LOS PROGRAMAS Y EVENTOS"],"aspectos_cambiar":["MÁS INVOLUCRAMIENTO EN LA POLÍTICA","MÁS INCENTIVOS A SOCIOS"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas"]},{"region":"Nodo Litoral","rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED","INNOVACIÓN Y ADAPTABILIDAD"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES","REVISIÓN DE LA ESTRATEGIA DE FINANCIAMIENTO"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Oeste","rol":"Miembro de la Comisión Directiva","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":5.0,"I+D":5.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":5.0,"Certificaciones":3.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"Sí","factores":["Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Presidente Honorario","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":4.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Centro","rol":"Otro","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":4.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS","PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["HORIZONTALIDAD Y MATRICIALIDAD"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA","REVISIÓN DE LA ESTRATEGIA DE FINANCIAMIENTO"],"participacion":"Ns/Nc","factores":["Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Integrante de Mesas Técnicas / Chacras","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":5.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA","TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Miembro de la Comisión Directiva","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Sí","factores":["Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["REVISIÓN DE LA ESTRATEGIA DE FINANCIAMIENTO"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Centro","rol":"Miembro de la Comisión Directiva","mision":"3. Me representa medianamente","satisf":3.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":3.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":3.0,"Sist. Chacras":4.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":4.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD","MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE","MÁS DIVERSIDAD Y APERTURA","MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"No","factores":["Mercados internacionales", "Estándares sustentabilidad", "Marco regulatorio"]},{"region":"Nodo Litoral","rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":4.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":5.0,"Certificaciones":4.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":[],"aspectos_pos":["BUEN FUNCIONAMIENTO DE LOS PROGRAMAS Y EVENTOS","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MEJORAR E INCORPORAR MÁS GESTIÓN TÉCNICA Y TÉCNOLOGIA"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad", "Marco regulatorio"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"Sí","factores":["Transformaciones tecnológicas"]},{"region":"Nodo Oeste","rol":"Gerente o miembro del Staff de AAPRESID","mision":"3. Me representa medianamente","satisf":3.0,"valores":{"Innovación":3.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"No","factores":["Marco regulatorio", "Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Presidente Honorario","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","BUEN FUNCIONAMIENTO DE LOS PROGRAMAS Y EVENTOS"],"aspectos_cambiar":["MÁS DIVERSIDAD Y APERTURA"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad", "Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo NOA","rol":"Integrante de Mesas Técnicas / Chacras","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":5.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":5.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN","APERTURA Y PLURALIDAD"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED","COMPROMISO Y CAPACIDAD DE EQUIPO TÉCNICO"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","MÁS INVOLUCRAMIENTO EN LA POLÍTICA"],"participacion":"Sí","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Oeste Medanoso","rol":"Otro","mision":"4. Me representa bastante","satisf":3.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":["PÉRDIDA DE IDENTIDAD","NUEVOS COSTOS Y MAL USO DE RECURSOS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES","MEJORAR E INCORPORAR MÁS GESTIÓN TÉCNICA Y TÉCNOLOGIA"],"participacion":"No","factores":["Evolución sistema productivo", "Contexto económico"]},{"region":"Nodo Litoral","rol":"Otro","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PRESENCIA Y CONEXIÓN CON REGIONALES"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad", "Legitimidad social", "Transformaciones tecnológicas"]},{"region":"Nodo Sur","rol":"Presidente Honorario","mision":"5. Me representa totalmente","satisf":null,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":[],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS DIVERSIDAD Y APERTURA","REVISIÓN DE LA ESTRATEGIA DE FINANCIAMIENTO"],"participacion":"Ns/Nc","factores":["Marco regulatorio", "Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Gerente o miembro del Staff de AAPRESID","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES","APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Sí","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo NOA","rol":"Otro","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":3.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":4.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN","APERTURA Y PLURALIDAD"],"riesgos":[],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","MEJORAR E INCORPORAR MÁS GESTIÓN TÉCNICA Y TÉCNOLOGIA"],"participacion":"Sí","factores":["Marco regulatorio", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Centro","rol":"Integrante de Mesas Técnicas / Chacras","mision":"4. Me representa bastante","satisf":null,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":5.0,"Trabajo en red":4.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":4.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":4.0,"Formación/Jóvenes":4.0,"Congreso":4.0},"beneficios":["MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["RESPALDO A PRÁCTICAS POTENCIALMENTE DEGRADANTES","PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["HORIZONTALIDAD Y MATRICIALIDAD","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICAB"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad", "Legitimidad social", "Contexto económico"]},{"region":"Nodo Oeste Medanoso","rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":5.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["PÉRDIDA DE IDENTIDAD"],"aspectos_pos":["TRABAJO EN RED","COMPROMISO Y CAPACIDAD DE EQUIPO TÉCNICO"],"aspectos_cambiar":["FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"Sí","factores":["Mercados internacionales", "Estándares sustentabilidad", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":4.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":3.0,"Congreso":4.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS CONOCIMIENTO, APRENDIZAJE E INVESTIGACIÓN"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","DIFUSIÓN Y GENERACIÓN DE CONOCIMIENTO"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS"],"participacion":"Ns/Nc","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Otro","mision":"2. Me representa poco","satisf":1.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":3.0,"Congreso":3.0,"Semillero jóvenes":2.0},"servicios":{"Investigación/divulgación":3.0,"Sist. Chacras":3.0,"Redes articulación":3.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":3.0},"beneficios":["APERTURA Y PLURALIDAD"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS","PÉRDIDA DE SOCIOS"],"aspectos_pos":["TRABAJO EN RED","CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MÁS PARTICIPACIÓN DE SOCIOS","FUNCIONAMIENTO Y TAMAÑO DE LA ESTRUCTURA INTERNA"],"participacion":"No","factores":["Marco regulatorio", "Legitimidad social", "Transformaciones tecnológicas"]},{"region":"Nodo Oeste","rol":"Miembro de la Comisión Directiva","mision":"5. Me representa totalmente","satisf":5.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":5.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":5.0,"Divulgación socios":4.0,"I+D":5.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":4.0},"servicios":{"Investigación/divulgación":5.0,"Sist. Chacras":5.0,"Redes articulación":5.0,"Certificaciones":3.0,"Formación/Jóvenes":4.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MEJOR POSICIONAMIENTO Y CRECIMIENTO INSTITUCIONAL"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED","INNOVACIÓN Y ADAPTABILIDAD"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo"]},{"region":"Nodo Oeste","rol":"Otro","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":5.0,"Sustentabilidad":5.0,"Cuidado del suelo":5.0,"Siembra directa":4.0,"Trabajo en red":5.0,"Transparencia":5.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":5.0,"Liderazgo técnico":5.0},"funciones":{"Representación":4.0,"Divulgación socios":4.0,"I+D":4.0,"Certificación":3.0,"Proyección int.":4.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":4.0,"Redes articulación":4.0,"Certificaciones":3.0,"Formación/Jóvenes":3.0,"Congreso":5.0},"beneficios":["APERTURA Y PLURALIDAD","MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["CUESTIONAMIENTOS Y RESISTENCIAS"],"aspectos_pos":["TRABAJO EN RED"],"aspectos_cambiar":["MÁS SINERGIA INSTITUCIONAL"],"participacion":"Sí","factores":["Legitimidad social", "Evolución sistema productivo"]},{"region":"Nodo Sur","rol":"Miembro de la Comisión Directiva","mision":"4. Me representa bastante","satisf":4.0,"valores":{"Innovación":4.0,"Sustentabilidad":4.0,"Cuidado del suelo":4.0,"Siembra directa":4.0,"Trabajo en red":4.0,"Transparencia":4.0,"Diversidad de enfoques":4.0,"Compromiso con la ciencia":4.0,"Liderazgo técnico":4.0},"funciones":{"Representación":4.0,"Divulgación socios":3.0,"I+D":4.0,"Certificación":2.0,"Proyección int.":3.0,"Congreso":5.0,"Semillero jóvenes":3.0},"servicios":{"Investigación/divulgación":4.0,"Sist. Chacras":3.0,"Redes articulación":4.0,"Certificaciones":2.0,"Formación/Jóvenes":2.0,"Congreso":5.0},"beneficios":["MÁS PRÁCTICAS SUSTENTABLES EN OTRAS PRODUCCIONES"],"riesgos":["MALA PRENSA Y REPUTACIÓN"],"aspectos_pos":["CAPACIDAD DE AGENCIA Y REFERENCIA TÉCNICA"],"aspectos_cambiar":["MEJORAR LA DIFUSIÓN, COMUNICACIÓN Y MENSAJE"],"participacion":"Sí","factores":["Legitimidad social", "Transformaciones tecnológicas", "Evolución sistema productivo", "Contexto económico"]}];

// ─── HELPERS ───────────────────────────────────────────────────────────────
const ALL_REGIONS = ["Nodo Oeste","Nodo Sur","Nodo Centro","Nodo Litoral","Nodo Oeste Medanoso","Nodo NOA"];
const ALL_ROLES = [
  "Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)",
  "Gerente o miembro del Staff de AAPRESID",
  "Miembro de la Comisión Directiva",
  "Otro",
  "Integrante de Mesas Técnicas / Chacras",
  "Presidente Honorario",
];
const ROL_SHORT = {
  "Referente regional (Presidente/a, Vicepresidente/a o Tesorero/a)": "Referente regional",
  "Gerente o miembro del Staff de AAPRESID": "Staff AAPRESID",
  "Miembro de la Comisión Directiva": "Com. Directiva",
  "Integrante de Mesas Técnicas / Chacras": "Mesas Técnicas",
  "Presidente Honorario": "Pres. Honorario"
};

function avg(arr) {
  const v = arr.filter(x => x != null);
  return v.length ? v.reduce((a,b)=>a+b,0)/v.length : null;
}
function pct(arr, fn) {
  const v = arr.filter(x => x != null);
  if (!v.length) return null;
  return Math.round(v.filter(fn).length / v.length * 100);
}
function countSplit(arr, field) {
  const counts = {};
  arr.forEach(r => (r[field]||[]).forEach(v => { counts[v] = (counts[v]||0)+1; }));
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]);
}

// ─── TOOLTIP ───────────────────────────────────────────────────────────────
const CT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#fff", border:`1.5px solid ${C3}`, borderRadius:8, padding:"8px 14px", fontSize:13, maxWidth:220 }}>
      <p style={{ margin:0, fontWeight:700, color:DARK, marginBottom:4, wordBreak:"break-word" }}>{label}</p>
      {payload.map((p,i)=>(
        <p key={i} style={{ margin:"2px 0", color:DARK }}>
          {p.name}: <strong>{typeof p.value==="number"&&p.value<=100 ? `${p.value}${p.name.includes("Prom")?" / 5":"%"}` : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

const Card = ({ children, style={} }) => (
  <div style={{ background:CARD_BG, borderRadius:14, padding:20, boxShadow:"0 2px 16px rgba(180,100,0,0.08)", border:`1px solid ${C6}`, ...style }}>
    {children}
  </div>
);

const KPI = ({ icon, value, label, sub }) => (
  <Card style={{ display:"flex", alignItems:"center", gap:14, padding:"18px 20px" }}>
    <span style={{ fontSize:30 }}>{icon}</span>
    <div>
      <div style={{ fontSize:26, fontWeight:800, color:C1, lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12, color:"#666", marginTop:3 }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:C4, marginTop:2 }}>{sub}</div>}
    </div>
  </Card>
);

const STitle = ({ children }) => (
  <h2 style={{ fontFamily:"Georgia,serif", fontSize:18, color:C1, borderBottom:`2px solid ${C3}`, paddingBottom:8, marginBottom:20, letterSpacing:"0.01em", marginTop:0 }}>
    {children}
  </h2>
);

// ─── WORD CLOUD (para palabras cortas) ────────────────────────────────────
function WordCloud({ words }) {
  const base = words && words.length ? words : WORDS;
  const sorted = [...base].sort((a,b) => b.count - a.count);
  const max = sorted[0]?.count || 1;
  const minFont = 13, maxFont = 72;
  const seed = (i) => ((i * 2654435761) >>> 0) / 4294967296;
  const rows = [];
  let currentRow = [], rowWidth = 0;
  const maxRowWidth = 600;
  sorted.forEach((w, i) => {
    const fontSize = Math.round(minFont + (w.count / max) * (maxFont - minFont));
    const approxW = w.text.length * fontSize * 0.6 + 20;
    if (rowWidth + approxW > maxRowWidth && currentRow.length > 0) {
      rows.push(currentRow); currentRow = []; rowWidth = 0;
    }
    currentRow.push({ ...w, fontSize, approxW });
    rowWidth += approxW + 8;
  });
  if (currentRow.length > 0) rows.push(currentRow);
  const totalHeight = rows.reduce((acc, row) => {
    const maxFS = Math.max(...row.map(w => w.fontSize));
    return acc + maxFS + 14;
  }, 30);
  let y = 20;
  const layoutWords = [];
  rows.forEach((row, ri) => {
    const maxFS = Math.max(...row.map(w => w.fontSize));
    const totalW = row.reduce((s, w) => s + w.approxW + 8, 0);
    let x = (640 - totalW) / 2 + 10;
    row.forEach((w, wi) => {
      layoutWords.push({ ...w, x, y: y + maxFS * 0.8 });
      x += w.approxW + 8 + seed(ri * 10 + wi) * 10;
    });
    y += maxFS + 14;
  });
  return (
    <div style={{ background:`linear-gradient(135deg, ${C6}44, #fff)`, borderRadius:12, padding:16, border:`1px solid ${C5}` }}>
      <svg viewBox={`0 0 640 ${totalHeight + 30}`} width="100%" style={{ display:"block" }}>
        {layoutWords.map((w, i) => (
          <text key={i} x={w.x} y={w.y} fontSize={w.fontSize} fill={PALETTE[i % PALETTE.length]}
            fontWeight={w.count >= 5 ? "800" : w.count >= 2 ? "600" : "400"}
            style={{ fontFamily:"Georgia, serif" }} opacity={0.85 + (w.count / max) * 0.15}>
            {w.text}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ─── VISION BUBBLES — para frases largas ──────────────────────────────────
function VisionBubbles({ words }) {
  const sorted = [...words].sort((a,b) => b.count - a.count);
  const total = sorted.reduce((s,w) => s + w.count, 0);
  const max = sorted[0]?.count || 1;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {sorted.map((w, i) => {
        const pctVal = Math.round(w.count / total * 100);
        const isMain = i < 2;
        const barWidth = Math.round((w.count / max) * 100);
        return (
          <div key={i} style={{
            background: isMain ? `linear-gradient(135deg, ${i===0?C1:C2}18, ${i===0?C1:C2}08)` : "#fafafa",
            border: `${isMain ? 2 : 1}px solid ${isMain ? (i===0?C1:C2) : C5}`,
            borderRadius: 12,
            padding: isMain ? "16px 20px" : "10px 16px",
            display:"flex", alignItems:"center", gap:16,
          }}>
            {/* Solo porcentaje */}
            <div style={{ minWidth: isMain ? 64 : 48, textAlign:"center" }}>
              <div style={{ fontSize: isMain ? 28 : 18, fontWeight:800, color: isMain ? (i===0?C1:C2) : C4, lineHeight:1 }}>
                {pctVal}%
              </div>
            </div>

            {/* Texto + barra */}
            <div style={{ flex:1 }}>
              <div style={{
                fontSize: isMain ? 15 : 13,
                fontWeight: isMain ? 700 : 500,
                color: isMain ? DARK : "#555",
                fontFamily: isMain ? "Georgia, serif" : "inherit",
                marginBottom: 6,
                lineHeight: 1.3,
              }}>
                {w.text}
              </div>
              <div style={{ background:"#eee", borderRadius:4, height:6, overflow:"hidden" }}>
                <div style={{
                  width:`${barWidth}%`,
                  height:"100%",
                  background: i===0 ? C1 : i===1 ? C2 : i===2 ? C3 : C5,
                  borderRadius:4,
                  transition:"width 0.3s"
                }}/>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MAP COMPONENT ─────────────────────────────────────────────────────────
const ARG_PATH = "M 69.0,34.5 L 86.2,34.5 L 89.8,45.2 L 98.0,45.2 L 103.4,36.6 L 114.8,34.5 L 124.1,34.5 L 130.9,43.6 L 135.7,32.8 L 151.3,36.4 L 169.6,30.4 L 182.3,32.8 L 207.3,3.6 L 206.6,33.1 L 208.9,51.8 L 213.6,62.5 L 217.5,67.3 L 221.7,79.2 L 231.2,92.3 L 245.4,109.2 L 253.8,94.1 L 257.1,96.9 L 255.5,108.3 L 253.8,122.8 L 240.8,119.7 L 231.9,126.7 L 229.1,145.6 L 222.7,157.7 L 214.9,156.8 L 210.7,159.2 L 207.3,172.7 L 204.8,194.7 L 214.8,211.9 L 217.8,219.1 L 221.1,231.0 L 214.3,249.3 L 215.9,260.8 L 220.5,271.8 L 212.0,273.3 L 193.4,280.1 L 165.4,286.7 L 158.0,294.1 L 154.9,310.1 L 152.9,318.6 L 125.7,329.0 L 122.4,348.0 L 119.5,359.5 L 116.7,371.9 L 119.8,385.2 L 105.6,389.9 L 106.1,406.7 L 102.8,421.5 L 94.1,436.9 L 82.9,455.5 L 74.8,466.8 L 78.9,481.5 L 88.6,493.8 L 82.1,504.9 L 94.7,512.5 L 112.1,527.9 L 124.0,529.7 L 129.2,524.6 L 117.7,519.1 L 82.4,511.5 L 70.3,496.5 L 64.9,482.0 L 53.2,474.8 L 41.0,459.2 L 35.6,445.0 L 41.5,429.7 L 53.2,414.7 L 49.6,392.4 L 47.3,370.0 L 47.7,346.9 L 44.5,324.6 L 47.2,309.6 L 52.8,287.0 L 58.9,264.9 L 71.0,242.0 L 70.9,220.3 L 66.9,197.4 L 76.7,174.8 L 70.4,152.3 L 76.4,130.0 L 82.4,108.0 L 94.6,92.7 L 99.9,70.5 L 105.9,55.7 L 117.6,34.5 Z";

const MAP_NODES = [
  { key:"Nodo NOA",            label:"Nodo NOA",        city:"NOA",                  x:118.8, y:74.6  },
  { key:"Nodo Litoral",        label:"Nodo Litoral",    city:"Videla, Santa Fe",     x:179.9, y:145.3 },
  { key:"Nodo Oeste",          label:"Nodo Oeste",      city:"Río Cuarto / Córdoba", x:131.2, y:199.6 },
  { key:"Nodo Centro",         label:"Nodo Centro",     city:"9 de Julio, BA",       x:171.9, y:234.3 },
  { key:"Nodo Oeste Medanoso", label:"Nodo Oeste Med.", city:"Pehuajó, BA",          x:160.0, y:240.3 },
  { key:"Nodo Sur",            label:"Nodo Sur",        city:"Tandil, BA",           x:192.5, y:262.3 },
];

function MapSection({ data, filtered }) {
  const [hovered, setHovered] = useState(null);

  const nodeData = useMemo(() => {
    const out = {};
    MAP_NODES.forEach(n => {
      const sub = filtered.filter(r => r.region === n.key);
      const total = sub.length;
      if (!total) { out[n.key] = { total:0 }; return; }
      const misionPct = pct(sub.map(r=>r.mision), v=>v?.startsWith("4")||v?.startsWith("5"));
      const topBen    = countSplit(sub,"beneficios").slice(0,3);
      const topRie    = countSplit(sub,"riesgos").slice(0,3);
      const identMap  = {};
      sub.forEach(r => {
        const gi = data.indexOf(r);
        const raw = IDENTITY_BY_IDX[String(gi)];
        if (!raw) return;
        let w = raw.trim().toLowerCase();
        if (w.includes("sustent"))       w = "Sustentabilidad";
        else if (w.includes("sostenib")) w = "Sostenibilidad";
        else if (w.includes("innov"))    w = "Innovación";
        else if (w.includes("regener"))  w = "Regeneración";
        else w = w.charAt(0).toUpperCase() + w.slice(1);
        identMap[w] = (identMap[w]||0)+1;
      });
      const topIdentidad = Object.entries(identMap).sort((a,b)=>b[1]-a[1])[0]?.[0] || null;
      out[n.key] = { total, misionPct, topBen, topRie, topIdentidad };
    });
    return out;
  }, [filtered, data]);

  return (
    <Card>
      <STitle>🗺️ Mapa de Nodos</STitle>
      <div style={{ display:"flex", gap:20, alignItems:"stretch", flexWrap:"wrap" }}>
        <svg viewBox="0 0 300 560" preserveAspectRatio="xMidYMid slice" style={{ width:260, flexShrink:0, borderRadius:8, border:`1px solid ${C5}`, background:"#c8dff0", alignSelf:"stretch", height:"auto", minHeight:"100%" }}>
          <path d={ARG_PATH} fill="#f2ead6" stroke="#9e7a3a" strokeWidth="1.4" strokeLinejoin="round"/>
          <text x="145" y="18" textAnchor="middle" fill="#aaa" fontSize="7" fontStyle="italic">BOLIVIA</text>
          <text x="238" y="56" textAnchor="middle" fill="#aaa" fontSize="7" fontStyle="italic">PARAGUAY</text>
          <text x="262" y="125" textAnchor="middle" fill="#aaa" fontSize="7" fontStyle="italic">BRASIL</text>
          <text x="248" y="192" textAnchor="middle" fill="#aaa" fontSize="7" fontStyle="italic">URUGUAY</text>
          <text x="36" y="172" textAnchor="middle" fill="#aaa" fontSize="7" fontStyle="italic">CHILE</text>
          <text x="272" y="285" textAnchor="middle" fill="#88aacc" fontSize="7" fontStyle="italic">ATLÁNTICO</text>
          <text x="26" y="365" textAnchor="middle" fill="#88aacc" fontSize="7" fontStyle="italic">PACÍFICO</text>
          {MAP_NODES.map((n,i) => MAP_NODES.slice(i+1).map(m => (
            <line key={`${n.key}-${m.key}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke={C4} strokeWidth="0.7" opacity="0.4" strokeDasharray="3,2"/>
          )))}
          {MAP_NODES.map(n => {
            const isHov = hovered?.key === n.key;
            return (
              <g key={n.key} style={{ cursor:"pointer" }}
                onMouseEnter={()=>setHovered(n)} onMouseLeave={()=>setHovered(null)}>
                <circle cx={n.x} cy={n.y} r={14} fill={C2} opacity={isHov?0.22:0.07}/>
                <circle cx={n.x} cy={n.y} r={8}  fill={isHov?C1:C2} stroke="#fff" strokeWidth="1.8"/>
                <text x={n.x} y={n.y+12+8+3} textAnchor="middle" fill={DARK} fontSize="7" fontWeight="700">{n.label}</text>
                <text x={n.x} y={n.y+12+8+11} textAnchor="middle" fill="#777" fontSize="6">{n.city}</text>
              </g>
            );
          })}
        </svg>

        <div style={{ flex:1, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, alignContent:"start" }}>
          {MAP_NODES.map(n => {
            const d = nodeData[n.key];
            if (!d || d.total === 0) return (
              <div key={n.key} style={{ background:"#fff", border:`1px solid ${C5}`, borderRadius:10, padding:12, opacity:0.5 }}>
                <div style={{ fontWeight:800, color:C1, fontSize:13 }}>{n.label}</div>
                <div style={{ fontSize:10, color:"#aaa" }}>{n.city}</div>
                <div style={{ fontSize:10, color:"#bbb", marginTop:8 }}>Sin datos</div>
              </div>
            );
            return (
              <div key={n.key} style={{ background:"#fff", border:`2px solid ${C2}`, borderRadius:10, padding:12, boxShadow:"0 2px 10px rgba(180,100,0,0.1)" }}>
                <div style={{ fontWeight:800, color:C1, fontSize:13, marginBottom:1 }}>{n.label}</div>
                <div style={{ fontSize:10, color:"#aaa", marginBottom:8 }}>{n.city}</div>
                <div style={{ background:C6, borderRadius:6, padding:"5px 4px", textAlign:"center", marginBottom:8 }}>
                  <div style={{ fontSize:16, fontWeight:800, color:C1 }}>{d.misionPct}%</div>
                  <div style={{ fontSize:8, color:"#666" }}>Identificación misión</div>
                </div>
                {d.topIdentidad && (
                  <div style={{ background:`${C3}44`, borderRadius:6, padding:"5px 8px", marginBottom:8, textAlign:"center" }}>
                    <div style={{ fontSize:8, color:"#888", marginBottom:1 }}>IDENTIDAD EN UNA PALABRA</div>
                    <div style={{ fontSize:13, fontWeight:800, color:C1 }}>"{d.topIdentidad}"</div>
                  </div>
                )}
                <div style={{ fontSize:10, fontWeight:700, color:C4, margin:"6px 0 3px" }}>Beneficios:</div>
                {d.topBen?.map(([b],i)=>(
                  <div key={i} style={{ fontSize:9, color:DARK, marginBottom:2 }}>
                    <span style={{ color:C2, fontWeight:700 }}>↑ </span>{b}
                  </div>
                ))}
                <div style={{ fontSize:10, fontWeight:700, color:C4, margin:"6px 0 3px" }}>Riesgos:</div>
                {d.topRie?.length ? d.topRie.map(([r],i)=>(
                  <div key={i} style={{ fontSize:9, color:DARK, marginBottom:2 }}>
                    <span style={{ color:C1, fontWeight:700 }}>! </span>{r}
                  </div>
                )) : <div style={{ fontSize:9, color:"#aaa" }}>Sin datos</div>}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

// ─── MAIN DASHBOARD ────────────────────────────────────────────────────────
export default function Dashboard() {
  const [tab, setTab] = useState("resumen");
  const [filterRegion, setFilterRegion] = useState("Todas");
  const [filterRol, setFilterRol] = useState("Todos");

  const filtered = useMemo(() => {
    return RAW.filter(r => {
      if (filterRegion !== "Todas" && r.region !== filterRegion) return false;
      if (filterRol !== "Todos" && r.rol !== filterRol) return false;
      return true;
    });
  }, [filterRegion, filterRol]);

  const n = filtered.length;

  const misionPct = pct(filtered.map(r=>r.mision), v=>v?.startsWith("4")||v?.startsWith("5"));

  const misionDist = useMemo(() => {
    const map = {};
    filtered.forEach(r => { if(r.mision) { const k=r.mision.replace(/^\d\. /,""); map[k]=(map[k]||0)+1; } });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([name,v])=>({ name, pct: Math.round(v/n*100), count:v }));
  }, [filtered, n]);

  const valoresData = useMemo(() => {
    const keys = ["Innovación","Sustentabilidad","Cuidado del suelo","Siembra directa","Trabajo en red","Transparencia","Diversidad de enfoques","Compromiso con la ciencia","Liderazgo técnico"];
    return keys.map(k => {
      const vals = filtered.map(r=>r.valores[k]).filter(v=>v!=null);
      const a = vals.length ? avg(vals) : null;
      return { name:k, score: a ? Math.round(a*10)/10 : null };
    }).filter(d=>d.score!=null).sort((a,b)=>b.score-a.score);
  }, [filtered]);

  const funcionesData = useMemo(() => {
    const keys = ["Representación","Divulgación socios","I+D","Certificación","Proyección int.","Congreso","Semillero jóvenes"];
    return keys.map(k => {
      const vals = filtered.map(r=>r.funciones[k]).filter(v=>v!=null);
      return { name:k, score: vals.length ? Math.round(avg(vals)*10)/10 : null };
    }).filter(d=>d.score!=null).sort((a,b)=>b.score-a.score);
  }, [filtered]);

  const serviciosData = useMemo(() => {
    const keys = ["Investigación/divulgación","Sist. Chacras","Redes articulación","Certificaciones","Formación/Jóvenes","Congreso"];
    return keys.map(k => {
      const vals = filtered.map(r=>r.servicios[k]).filter(v=>v!=null);
      return { name:k, score: vals.length ? Math.round(avg(vals)*10)/10 : null };
    }).filter(d=>d.score!=null).sort((a,b)=>b.score-a.score);
  }, [filtered]);

  const factoresData = useMemo(() => {
    const total = filtered.length || 1;
    const keys = ["Evolución sistema productivo","Legitimidad social","Transformaciones tecnológicas","Marco regulatorio","Contexto económico","Mercados internacionales","Estándares sustentabilidad"];
    return keys.map(k => ({
      name: k,
      pct: Math.round(filtered.filter(r => r.factores && r.factores.includes(k)).length / total * 100),
      value: Math.round(filtered.filter(r => r.factores && r.factores.includes(k)).length / total * 100)
    })).sort((a,b) => b.value - a.value);
  }, [filtered]);

  const rolesData = useMemo(() => {
    const map = {};
    filtered.forEach(r => { if(r.rol) map[r.rol]=(map[r.rol]||0)+1; });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([name,v])=>({ name:ROL_SHORT[name]||name, pct:Math.round(v/n*100), count:v }));
  }, [filtered, n]);

  const regionesData = useMemo(() => {
    const map = {};
    filtered.forEach(r => { if(r.region) map[r.region]=(map[r.region]||0)+1; });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([name,v])=>({ name, pct:Math.round(v/n*100), count:v }));
  }, [filtered, n]);

  const beneficiosData = useMemo(() => countSplit(filtered,"beneficios").map(([name,v])=>({ name, pct:Math.round(v/n*100), count:v })), [filtered,n]);
  const riesgosData    = useMemo(() => countSplit(filtered,"riesgos").map(([name,v])=>({ name, pct:Math.round(v/n*100), count:v })), [filtered,n]);

  const participacionData = useMemo(() => {
    const map={Sí:0,"Ns/Nc":0,No:0};
    filtered.forEach(r=>{ if(r.participacion) map[r.participacion]=(map[r.participacion]||0)+1; });
    return Object.entries(map).filter(([,v])=>v>0).map(([name,v])=>({ name, pct:Math.round(v/n*100), count:v }));
  }, [filtered,n]);

  const tabs = [
    { id:"resumen",   label:"Resumen" },
    { id:"perfil",    label:"Perfil" },
    { id:"valores",   label:"Valores y Misión" },
    { id:"textos",    label:"Beneficios y Riesgos" },
    { id:"factores",  label:"Factores de Alcance" },
    { id:"identidad", label:"Identidad" },
    { id:"mapa",      label:"Mapa" },
    { id:"misionfuturo", label:"Misión y futuro" },
  ];

  const FSelect = ({ label, val, opts, onChange }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      <label style={{ fontSize:11, color:"#888", fontWeight:600 }}>{label}</label>
      <select value={val} onChange={e=>onChange(e.target.value)}
        style={{ padding:"6px 10px", borderRadius:8, border:`1.5px solid ${C5}`, background:"#fff", fontSize:13, color:DARK, cursor:"pointer", outline:"none" }}>
        {opts.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );

  const HBar = ({ data, colorFn, yWidth=200 }) => (
    <ResponsiveContainer width="100%" height={Math.max(data.length*56, 120)}>
      <BarChart data={data} layout="vertical" margin={{ left:4, right:50, top:4, bottom:4 }}>
        <XAxis type="number" domain={[0,100]} tickFormatter={v=>`${v}%`} tick={{ fontSize:11 }} />
        <YAxis
          type="category"
          dataKey="name"
          width={yWidth}
          tick={{ fontSize:11, fill:DARK }}
          tickLine={false}
        />
        <Tooltip content={<CT/>} formatter={(v)=>`${v}%`}/>
        <Bar dataKey="pct" name="%" radius={[0,6,6,0]} barSize={22} label={{ position:"right", formatter:v=>`${v}%`, fontSize:11, fill:DARK }}>
          {data.map((_,i)=><Cell key={i} fill={colorFn(i)}/>)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div style={{ fontFamily:"'Segoe UI', Georgia, sans-serif", background:BG, minHeight:"100vh" }}>
      {/* HEADER */}
      <div style={{ background:`linear-gradient(135deg, #2C1A00 0%, ${C1} 60%, ${C2} 100%)`, padding:"16px 16px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
          <span style={{ fontSize:38 }}>🌾</span>
          <div>
            <h1 style={{ fontFamily:"Georgia,serif", fontSize:24, fontWeight:700, margin:0, color:"#fff", letterSpacing:"0.02em" }}>
              AAPRESID — Presente y Futuro
            </h1>
            <p style={{ margin:0, color:"rgba(255,255,255,0.7)", fontSize:13 }}>Encuesta institucional · 104 respuestas</p>
          </div>
        </div>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              padding:"8px 16px", borderRadius:"10px 10px 0 0", border:"none", cursor:"pointer", fontSize:12,
              fontWeight:600, transition:"all 0.15s",
              background: tab===t.id ? "#fff" : "rgba(255,255,255,0.15)",
              color: tab===t.id ? C1 : "#fff",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background:"#fff", padding:"12px 16px", display:"flex", gap:24, alignItems:"flex-end", flexWrap:"wrap", borderBottom:`2px solid ${C6}`, boxShadow:"0 2px 8px rgba(180,100,0,0.06)" }}>
        <FSelect label="FILTRAR POR REGIÓN" val={filterRegion} opts={["Todas",...ALL_REGIONS]} onChange={setFilterRegion}/>
        <FSelect label="FILTRAR POR ROL" val={filterRol} opts={["Todos",...ALL_ROLES]} onChange={setFilterRol}/>
        {(filterRegion!=="Todas"||filterRol!=="Todos") && (
          <button onClick={()=>{setFilterRegion("Todas");setFilterRol("Todos")}}
            style={{ padding:"6px 14px", background:C1, color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600 }}>
            Limpiar filtros
          </button>
        )}
      </div>

      <div style={{ padding:"16px 12px", maxWidth:1100, margin:"0 auto" }}>

        {/* ── RESUMEN ── */}
        {tab==="resumen" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginBottom:24 }}>
              <KPI icon="👥" value={104} label="Respuestas totales" sub="encuesta institucional"/>
              <KPI icon="🎯" value={`${misionPct}%`} label="Identificación con la misión" sub="Puntaje 4 o 5"/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:18 }}>
              <Card>
                <STitle>Identificación con la misión</STitle>
                <HBar data={misionDist} colorFn={i=>[C1,C2,C3,C5][i]||C5}/>
              </Card>
              <Card>
                <STitle>Valores esenciales para el futuro (prom. 0–5)</STitle>
                <ResponsiveContainer width="100%" height={340}>
                  <BarChart data={valoresData} layout="vertical" margin={{ left:160, right:60, top:0, bottom:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C6}/>
                    <XAxis type="number" domain={[3,5]} tick={{ fontSize:11 }}/>
                    <YAxis type="category" dataKey="name" tick={{ fontSize:11 }} width={155}/>
                    <Tooltip content={<CT/>}/>
                    <Bar dataKey="score" name="Prom. (0-5)" radius={[0,6,6,0]} label={{ position:"right", formatter:v=>v.toFixed(1), fontSize:10 }}>
                      {valoresData.map((_,i)=><Cell key={i} fill={i===0?C1:i<3?C2:C3}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </>
        )}

        {/* ── PERFIL ── */}
        {tab==="perfil" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            <Card>
              <STitle>Distribución por rol (%)</STitle>
              <HBar data={rolesData} colorFn={i=>PALETTE[i%PALETTE.length]}/>
            </Card>
            <Card>
              <STitle>Distribución por región (%)</STitle>
              <HBar data={regionesData} colorFn={i=>PALETTE[i%PALETTE.length]}/>
            </Card>
            <Card style={{ gridColumn:"1/-1" }}>
              <STitle>¿Interés en participar en expansión a nuevas producciones?</STitle>
              <HBar data={participacionData} colorFn={i=>[C1,C4,C5][i]||C5}/>
            </Card>
          </div>
        )}

        {/* ── VALORES Y MISIÓN ── */}
        {tab==="valores" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            <Card style={{ gridColumn:"1/-1" }}>
              <STitle>Esencialidad de valores para AAPRESID del futuro (prom. 0–5)</STitle>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={valoresData} layout="vertical" margin={{ left:160, right:60, top:0, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C6}/>
                  <XAxis type="number" domain={[3,5]} tick={{ fontSize:11 }}/>
                  <YAxis type="category" dataKey="name" tick={{ fontSize:11 }} width={155}/>
                  <Tooltip content={<CT/>}/>
                  <Bar dataKey="score" name="Prom. (0-5)" radius={[0,6,6,0]} label={{ position:"right", formatter:v=>v.toFixed(1), fontSize:10 }}>
                    {valoresData.map((_,i)=><Cell key={i} fill={i===0?C1:i<3?C2:C3}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card style={{ gridColumn:"1/-1" }}>
              <STitle>Identificación con la misión</STitle>
              <HBar data={misionDist} colorFn={i=>[C1,C2,C3,C5][i]||C5}/>
            </Card>

            {/* VISIÓN A 10 AÑOS — reemplazado con VisionBubbles */}
            <Card style={{ gridColumn:"1/-1" }}>
              <STitle>🔭 Visión a 10 años — ¿Cuál debería ser el papel de AAPRESID?</STitle>
              <p style={{ fontSize:13, color:"#888", marginTop:-12, marginBottom:20 }}>
                Distribución de las 104 respuestas sobre el rol futuro de la Asociación.
              </p>
              <VisionBubbles words={VISION_WORDS} />
            </Card>
          </div>
        )}

        {/* ── BENEFICIOS Y RIESGOS ── */}
        {tab==="textos" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:18 }}>
            <Card>
              <STitle>✅ Beneficios percibidos (%)</STitle>
              <p style={{ fontSize:12, color:"#888", marginTop:-12, marginBottom:12 }}>
                % de respuestas que mencionan cada beneficio (múltiple selección)
              </p>
              <HBar data={beneficiosData} colorFn={i=>PALETTE[i%PALETTE.length]} yWidth={260}/>
            </Card>
            <Card>
              <STitle>⚠️ Riesgos percibidos (%)</STitle>
              <p style={{ fontSize:12, color:"#888", marginTop:-12, marginBottom:12 }}>
                % de respuestas que mencionan cada riesgo (múltiple selección)
              </p>
              <HBar data={riesgosData} colorFn={i=>[C1,C2,C3,C4,C5,C6][i%6]} yWidth={260}/>
            </Card>
          </div>
        )}

        {/* ── FACTORES ── */}
        {tab==="factores" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            <Card style={{ gridColumn:"1/-1" }}>
              <STitle>Factores que presionan a AAPRESID a ampliar su alcance (%)</STitle>
              <p style={{ fontSize:12, color:"#888", marginTop:-12, marginBottom:12 }}>
                % de respuestas que mencionan cada factor (múltiple selección)
              </p>
              <HBar data={factoresData} colorFn={i=>PALETTE[i%PALETTE.length]}/>
            </Card>
          </div>
        )}

        {/* ── MAPA ── */}
        {tab==="mapa" && <MapSection data={RAW} filtered={filtered}/>}

        {/* ── MISIÓN Y FUTURO ── */}
        {tab==="misionfuturo" && (() => {
          const misionData = [
            { name:"Me representa totalmente",   value:62.5, color:C1 },
            { name:"Me representa bastante",     value:28.1, color:C2 },
            { name:"Me representa medianamente", value:6.3,  color:C3 },
            { name:"Me representa poco",         value:3.1,  color:C5 },
          ];
          const alcanceData = [
            { name:"Sí, pero gradualmente cuidando la identidad", value:50,   color:C1 },
            { name:"Sí, claramente debería hacerlo",              value:25,   color:C2 },
            { name:"No lo sé / prefiero analizarlo más",          value:12.5, color:C3 },
            { name:"No, mantenernos en siembra directa",          value:12.5, color:C4 },
          ];
          const identFuturoWords = [
            { text:"Sustentabilidad", count:30 },
            { text:"Futuro",          count:12 },
            { text:"Herencia",        count:8  },
            { text:"Sostenibilidad",  count:7  },
            { text:"Suelo",           count:6  },
            { text:"Regenerar",       count:5  },
            { text:"/sistema SD",     count:4  },
            { text:"Innovación",      count:4  },
            { text:"Conciencia",      count:3  },
            { text:"Respeto",         count:3  },
          ];

          const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
            if (percent < 0.05) return null;
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            return (
              <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight="700">
                {`${(percent * 100).toFixed(1)}%`}
              </text>
            );
          };

          return (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
              <Card>
                <STitle>Identificación con la misión actual</STitle>
                <p style={{ fontSize:12, color:"#888", marginTop:-12, marginBottom:4 }}>
                  Impulsar sistemas de producción sustentables de alimentos, fibras y energía, a través de la innovación en red
                </p>
                <p style={{ fontSize:11, color:C4, marginBottom:16 }}>32 respuestas</p>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={misionData} dataKey="value" cx="50%" cy="50%" outerRadius={110}
                      labelLine={false} label={<CustomPieLabel/>}>
                      {misionData.map((d,i) => <Cell key={i} fill={d.color}/>)}
                    </Pie>
                    <Legend formatter={(value) => <span style={{ fontSize:11, color:DARK }}>{value}</span>}/>
                    <Tooltip formatter={(v) => `${v}%`}/>
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <STitle>¿Ampliar alcance a otros sistemas productivos?</STitle>
                <p style={{ fontSize:12, color:"#888", marginTop:-12, marginBottom:4 }}>
                  Maní, papa, cultivos hortícolas, etc. que no se basen en siembra directa
                </p>
                <p style={{ fontSize:11, color:C4, marginBottom:16 }}>32 respuestas</p>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={alcanceData} dataKey="value" cx="50%" cy="50%" outerRadius={110}
                      labelLine={false} label={<CustomPieLabel/>}>
                      {alcanceData.map((d,i) => <Cell key={i} fill={d.color}/>)}
                    </Pie>
                    <Legend formatter={(value) => <span style={{ fontSize:11, color:DARK }}>{value}</span>}/>
                    <Tooltip formatter={(v) => `${v}%`}/>
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card style={{ gridColumn:"1/-1" }}>
                <STitle>💬 ¿Qué concepto definiría la identidad de AAPRESID en el futuro?</STitle>
                <p style={{ fontSize:12, color:"#888", marginTop:-12, marginBottom:20 }}>
                  Palabras mencionadas por los participantes. El tamaño refleja la frecuencia.
                </p>
                <WordCloud words={identFuturoWords}/>
              </Card>
            </div>
          );
        })()}

        {/* ── IDENTIDAD ── */}
        {tab==="identidad" && (() => {
          const identWords = (() => {
            const map = {};
            filtered.forEach(r => {
              const gi = RAW.indexOf(r);
              const raw = IDENTITY_BY_IDX[String(gi)];
              if (!raw) return;
              let w = raw.trim().toLowerCase();
              if (w.includes("sustent"))       w = "Sustentabilidad";
              else if (w.includes("sostenib")) w = "Sostenibilidad";
              else if (w.includes("innov"))    w = "Innovación";
              else if (w.includes("regener"))  w = "Regeneración";
              else w = w.charAt(0).toUpperCase() + w.slice(1);
              if (w.length > 22) w = w.slice(0,22)+"…";
              map[w] = (map[w]||0)+1;
            });
            return Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([text,count])=>({text,count}));
          })();
          return (
            <Card>
              <STitle>💬 Identidad de AAPRESID en una palabra</STitle>
              <p style={{ fontSize:13, color:"#888", marginTop:-12, marginBottom:20 }}>
                Se pidió a los participantes que definieran en una sola palabra la identidad futura de AAPRESID. El tamaño refleja la frecuencia de cada término.
              </p>
              <WordCloud words={identWords} />
              <div style={{ marginTop:24 }}>
                <STitle>Frecuencia por término (%)</STitle>
                {(() => {
                  const total = identWords.reduce((s,w)=>s+w.count,0);
                  const pctWords = [...identWords].sort((a,b)=>b.count-a.count).map(w=>({
                    ...w, pct: total ? Math.round(w.count/total*100) : 0
                  }));
                  return (
                    <ResponsiveContainer width="100%" height={Math.max(pctWords.length*42, 300)}>
                      <BarChart data={pctWords} layout="vertical" margin={{ left:4, right:40, top:0, bottom:40 }}>
                        <XAxis type="number" domain={[0,100]} tickFormatter={v=>`${v}%`} tick={{ fontSize:11 }}/>
                        <YAxis type="category" dataKey="text" width={150} tick={{ fontSize:11, fill:DARK }}/>
                        <Tooltip content={<CT/>} formatter={(v)=>`${v}%`}/>
                        <Bar dataKey="pct" name="%" radius={[0,6,6,0]} label={{ position:"right", formatter:v=>`${v}%`, fontSize:11, fill:DARK }}>
                          {pctWords.map((_,i)=><Cell key={i} fill={PALETTE[i%PALETTE.length]}/>)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  );
                })()}
              </div>
            </Card>
          );
        })()}

      </div>

      <div style={{ textAlign:"center", padding:"12px", color:"#bbb", fontSize:11 }}>
        AAPRESID · Encuesta institucional · Dashboard interactivo
      </div>
    </div>
  );
}
