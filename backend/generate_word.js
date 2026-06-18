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
          text: 'Módulos Operativos (9 Pasos)',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '1. Recepción y Pesaje: ', bold: true }),
            new TextRun('Registro de vehículos y automatización del peso neto (Peso Bruto - Tara).'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '2. Descarga y Almacenamiento Temporal: ', bold: true }),
            new TextRun('Recepción en bahías para inspección previa a la separación.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '3. Segregación o Clasificación: ', bold: true }),
            new TextRun('Cuantificación de Papel, Cartón, Plásticos, Vidrio, Metales, Textiles y Orgánicos.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '4. Trituración: ', bold: true }),
            new TextRun('Reducción de tamaño de plásticos o metales mediante máquinas, con registro por lotes.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '5. Tratamiento de Residuos Orgánicos: ', bold: true }),
            new TextRun('Bitácora de temperatura/humedad para Compostaje y Biodigestión (Biogás).'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '6. Compactación: ', bold: true }),
            new TextRun('Compresión de residuos no aprovechables registrando volumen final en m3.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '7. Almacenamiento de Reciclables: ', bold: true }),
            new TextRun('Inventario de materiales listos para comercialización.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '8. Tratamiento de Lixiviados: ', bold: true }),
            new TextRun('Monitoreo químico (pH, DBO, DQO) del líquido generado por la basura para evitar contaminación.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '9. Disposición Final: ', bold: true }),
            new TextRun('Envío y registro de los rechazos compactados al relleno sanitario autorizado.'),
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
