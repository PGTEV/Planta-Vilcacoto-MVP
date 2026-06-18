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
        
        new Paragraph({ text: 'Módulo 1 y 2: Entrada y Descarga (Realidad Peruana)', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          text: 'Ejemplo: Llega el Volquete ABC-123. Registra 18.5 Ton brutos y 8.5 Ton vacíos. El sistema saca 10 Ton Netas. En el módulo 2, lo asignamos a la "Plataforma de Descarga General", adaptándonos a que los camiones traen basura mezclada.',
        }),

        new Paragraph({ text: 'Módulo 3 y 4: Recuperación', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          text: 'Ejemplo: De la plataforma general, los operarios logran separar 1.5 Ton de Plástico PET en el Módulo 3. Si ocupa mucho espacio, pasa al Módulo 4 donde se registra que las trituradoras procesaron esas 1.5 Ton, controlando así las máquinas.',
        }),

        new Paragraph({ text: 'Módulo 5 y 6: Transformación', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          text: 'Ejemplo: La materia orgánica se registra en la bitácora del Módulo 5 (ej. 65°C de temperatura del compost). La basura no aprovechable va a la prensa en el Módulo 6, donde 4 Toneladas se compactan en solo 2 metros cúbicos (m3).',
        }),

        new Paragraph({ text: 'Módulo 7 y 8: Negocios y Ambiente', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          text: 'Ejemplo Negocio (Mod 7): El plástico triturado va directamente al "Almacén Principal". El área de ventas ve este stock en tiempo real. \nEjemplo Ambiental (Mod 8): Se registran parámetros como el pH (7.2) de los líquidos lixiviados para cumplir con el Ministerio del Ambiente.',
        }),

        new Paragraph({ text: 'Módulo 9: Cierre', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          text: 'Ejemplo: El camión XYZ-987 se lleva los 2 metros cúbicos de basura inservible y compactada al Relleno Sanitario Municipal. Aquí el ciclo se cierra de manera formal.',
        }),
        new Paragraph({ text: '' }),

        // SECCIÓN 4
        new Paragraph({ text: '4. Conclusión', heading: HeadingLevel.HEADING_1 }),
        new Paragraph({
          text: 'No es un simple formulario. Es una herramienta de Toma de Decisiones gerenciales que guía a los operarios y transforma toneladas de basura en métricas claras para hacer de Vilcacoto una planta financieramente y ecológicamente sostenible.',
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('../Guia_Vilcacoto_Sustentacion.docx', buffer);
  console.log('Documento creado exitosamente!');
});
