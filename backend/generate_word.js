const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          text: 'Guía de Uso - Sistema Operativo Vilcacoto',
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'Introducción',
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          text: 'Este documento detalla el funcionamiento del Sistema de Información de la Planta de Tratamiento de Residuos Sólidos de Vilcacoto.',
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'Arquitectura del Sistema',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '1. Frontend (React + Vite): ', bold: true }),
            new TextRun('Es la interfaz visual. Se corre con el comando "npm run dev".'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '2. Backend (NestJS): ', bold: true }),
            new TextRun('Es el cerebro lógico. Se corre con "npm run start:dev". Procesa los pesos, lixiviados y materiales.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '3. Base de Datos (PostgreSQL): ', bold: true }),
            new TextRun('Almacena toda la información de forma segura en el puerto 5432.'),
          ],
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'Módulos Principales',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '- Recepción y Pesaje: ', bold: true }),
            new TextRun('Permite registrar vehículos y automatizar el cálculo del peso neto usando el peso bruto y la tara (con validación de máximos).'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '- Segregación: ', bold: true }),
            new TextRun('Permite cuantificar los materiales reciclables (Plásticos, Papel, Vidrio) y orgánicos.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '- Tratamiento (Compostaje): ', bold: true }),
            new TextRun('Bitácora digital para registrar temperatura y humedad de las pilas de compost.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '- Control Ambiental: ', bold: true }),
            new TextRun('Monitoreo del pH, DBO y DQO de los lixiviados con alertas.'),
          ],
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: 'Cómo arrancar el proyecto',
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({ text: '1. Inicia Docker y levanta la base de datos con: docker compose up -d' }),
        new Paragraph({ text: '2. En una terminal, entra a la carpeta "backend" y ejecuta: npm run start:dev' }),
        new Paragraph({ text: '3. En otra terminal, entra a la carpeta "frontend" y ejecuta: npm run dev' }),
        new Paragraph({ text: '4. Abre http://localhost:5173 en tu navegador para usar el sistema.' }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('../Guia_Vilcacoto.docx', buffer);
  console.log('Documento creado exitosamente!');
});
