const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          text: 'Guía de Exposición: Sistema de Gestión Operativa Vilcacoto',
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({ text: '' }),
        
        // SECCIÓN 1
        new Paragraph({ text: '1. Introducción al Problema', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({
          text: 'La gestión operativa en muchas plantas de tratamiento sufre de un problema grave: la desconexión y el papel. Los camiones entran, la basura se clasifica y se tritura, pero todo se anota a mano. Esto impide saber la verdadera eficiencia de la planta, genera errores matemáticos y nos deja ciegos frente a auditorías ambientales.',
        }),
        new Paragraph({
          text: 'Solución:',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          text: 'Hemos desarrollado un Sistema Web de Gestión Operativa que digitaliza el 100% de la planta en 9 módulos secuenciales, estandarizado para trabajar a gran escala en Toneladas.',
        }),
        new Paragraph({ text: '' }),

        // SECCIÓN 2
        new Paragraph({ text: '2. Valor Agregado: ¿Cómo mejora la Planta?', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({
          children: [
            new TextRun({ text: '1. Inteligencia en Tiempo Real: ', bold: true }),
            new TextRun('El Dashboard Gerencial no es estático. Si hoy entraron 100 Toneladas y rescatamos 30 Toneladas, el sistema autocalcula la Eficiencia (30%).'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '2. Cero Errores (Automatización): ', bold: true }),
            new TextRun('El sistema procesa en Toneladas y calcula pesos netos automáticamente, evitando el uso de calculadoras en la balanza.'),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '3. Trazabilidad: ', bold: true }),
            new TextRun('Control total de la procedencia y el destino final de la basura.'),
          ],
        }),
        new Paragraph({ text: '' }),

        // SECCIÓN 3
        new Paragraph({ text: '3. El Flujo Operativo (Los 9 Módulos)', heading: HeadingLevel.HEADING_1 }),
        
        new Paragraph({ text: '1. Recepción y Pesaje', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'Todo inicia en la balanza. Simulamos que llega un Volquete. Registramos 18.5 Toneladas brutos y 8.5 Ton de tara. El sistema calcula automáticamente 10 Toneladas Netas.' }),

        new Paragraph({ text: '2. Descarga Temporal', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'Adaptándonos a la realidad peruana donde la basura llega mezclada en el camión, asignamos este vehículo directamente a la Plataforma de Descarga General.' }),

        new Paragraph({ text: '3. Segregación', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'Los operarios separan el material en las fajas. Ingresamos al sistema lo que logramos rescatar: por ejemplo, 1.5 Toneladas de Plástico PET y 7 Toneladas de orgánicos.' }),

        new Paragraph({ text: '4. Trituración', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'Si ese PET ocupa mucho espacio, pasa por la trituradora. Aquí registramos que procesamos 1.5 Toneladas de plástico para calcular el desgaste de la máquina.' }),

        new Paragraph({ text: '5. Tratamiento Orgánico', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'La materia orgánica (7 Toneladas) va al compostaje. El sistema obliga a registrar una bitácora de su Temperatura y Humedad (ej. 65°C).' }),

        new Paragraph({ text: '6. Compactación', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'La basura inservible va a la prensa. Aquí registramos que 4 Toneladas de basura se aplastaron hasta dejarlas en solo 2 metros cúbicos (m3).' }),

        new Paragraph({ text: '7. Materiales Reciclables', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'Módulo de Negocios. El plástico triturado y el compost se envían al sistema como stock al Almacén Principal para que el área de ventas pueda comercializarlo.' }),

        new Paragraph({ text: '8. Tratamiento Lixiviados', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'Módulo Ambiental. La basura bota jugo tóxico. El software obliga a registrar parámetros como el pH (ej. 7.2) y DBO para evitar clausuras.' }),

        new Paragraph({ text: '9. Disposición Final', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: 'Los cubos compactados que no sirven se van. Registramos que un tráiler se llevó los 2 m3 de rechazo al Relleno Sanitario Municipal. El ciclo de la basura termina oficialmente.' }),
        new Paragraph({ text: '' }),

        // SECCIÓN 4
        new Paragraph({ text: '4. Conclusión', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({
          text: 'No hemos construido un simple excel. Hemos construido una herramienta de Toma de Decisiones gerenciales que guía a los operarios y transforma toneladas de basura en métricas claras para hacer de Vilcacoto una planta sostenible.',
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('../Guia_Vilcacoto_Sustentacion.docx', buffer);
  console.log('Documento creado exitosamente!');
});
