const API_URL = 'http://localhost:3000';

async function postData(endpoint, data) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Error en ${endpoint}: ${response.statusText}`);
  return response.json();
}

async function seed() {
  console.log('Iniciando carga de datos de prueba para Vilcacoto...');
  const uid = Math.floor(Math.random() * 1000); // Para evitar duplicados en placas y lotes

  try {
    // 1. VEHÍCULOS
    const vehicles = [];
    for (let i = 1; i <= 10; i++) {
      const plate = `XYZ-${uid}-${i}`;
      const data = await postData('/vehicles', {
        plateNumber: plate,
        type: i % 2 === 0 ? 'Compactador' : 'Volquete',
        maxCapacityKg: 15000 + (Math.random() * 5000)
      });
      vehicles.push(data);
    }
    console.log(`✅ 10 Vehículos creados`);

    // 2. PESAJES (Módulo 1)
    const weighings = [];
    for (let i = 0; i < 10; i++) {
      const v = vehicles[i];
      const data = await postData('/weighings', {
        vehicleId: v.id,
        origin: `Zona ${['Norte', 'Centro', 'Sur', 'Este', 'Oeste'][i % 5]}`,
        grossWeightKg: 18000 + (Math.random() * 2000), // ~18-20 Ton
        tareWeightKg: 8000 + (Math.random() * 1000)    // ~8-9 Ton
      });
      weighings.push(data);
    }
    console.log(`✅ 10 Pesajes creados`);

    // 3. ALMACENAMIENTO (Módulo 2)
    for (let i = 0; i < 10; i++) {
      await postData('/storage', {
        weighingId: weighings[i].id,
        zone: 'Plataforma de Descarga General',
        notes: `Inspección rápida ok. Humedad: ${(Math.random() * 30 + 10).toFixed(1)}%`
      });
    }
    console.log(`✅ 10 Registros de Almacenamiento creados`);

    // 4. SEGREGACIÓN (Módulo 3)
    for (let i = 0; i < 10; i++) {
      await postData('/segregations', {
        paperWeightKg: 100 + (Math.random() * 200),
        plasticsWeightKg: 500 + (Math.random() * 500),
        glassWeightKg: 200 + (Math.random() * 300),
        metalsWeightKg: 100 + (Math.random() * 100),
        textilesWeightKg: 50 + (Math.random() * 50),
        organicWeightKg: 5000 + (Math.random() * 2000)
      });
    }
    console.log(`✅ 10 Registros de Segregación creados`);

    // 5. TRITURACIÓN (Módulo 4)
    for (let i = 1; i <= 10; i++) {
      await postData('/crushing', {
        batchId: `PET-LOTE-${uid}-${i}`,
        materialType: 'Plásticos',
        crushedWeightKg: 500 + (Math.random() * 500)
      });
    }
    console.log(`✅ 10 Registros de Trituración creados`);

    // 6. TRATAMIENTO ORGÁNICO (Módulo 5)
    for (let i = 1; i <= 10; i++) {
      await postData('/treatments', {
        treatmentType: 'Compostaje',
        batchId: `PILA-ORG-${uid}-${i}`,
        temperatureCelsius: 45 + (Math.random() * 25), // 45 a 70 grados
        humidityPercentage: 40 + (Math.random() * 20), // 40 a 60%
        producedVolume: 0 // Aún en proceso
      });
    }
    console.log(`✅ 10 Registros de Tratamiento (Compost) creados`);

    // 7. COMPACTACIÓN (Módulo 6)
    for (let i = 1; i <= 10; i++) {
      await postData('/compaction', {
        batchId: `RECHAZO-LOTE-${i}`,
        originalWeightKg: 3000 + (Math.random() * 2000), // 3 a 5 Ton
        compactedVolumeM3: 1.5 + (Math.random() * 1)    // 1.5 a 2.5 m3
      });
    }
    console.log(`✅ 10 Registros de Compactación creados`);

    // 8. INVENTARIO (Módulo 7)
    const materiales = ['Plástico PET Fardos', 'Papel y Cartón Fardos', 'Abono Orgánico (Compost)', 'Vidrio Triturado'];
    for (let i = 1; i <= 10; i++) {
      await postData('/inventory', {
        materialType: materiales[i % materiales.length],
        quantityKg: 1000 + (Math.random() * 2000),
        location: 'Almacén Principal'
      });
    }
    console.log(`✅ 10 Registros de Inventario creados`);

    // 9. LIXIVIADOS (Módulo 8)
    for (let i = 1; i <= 10; i++) {
      await postData('/environmental-logs', {
        phLevel: 6.5 + (Math.random() * 2), // 6.5 a 8.5
        dboValue: 200 + (Math.random() * 200), // 200 a 400
        dqoValue: 500 + (Math.random() * 300)  // 500 a 800
      });
    }
    console.log(`✅ 10 Registros de Lixiviados creados`);

    // 10. DISPOSICIÓN FINAL (Módulo 9)
    for (let i = 1; i <= 10; i++) {
      await postData('/disposal', {
        destination: 'Relleno Sanitario Municipal',
        volumeM3: 2 + (Math.random() * 3), // 2 a 5 m3
        weightKg: 4000 + (Math.random() * 2000), // 4 a 6 Ton
        vehiclePlate: `DEF-99${i % 10}`
      });
    }
    console.log(`✅ 10 Registros de Disposición Final creados`);

    console.log('🎉 PROCESO DE SEMBRADO DE DATOS (SEEDING) COMPLETADO CON ÉXITO!');

  } catch (error) {
    console.error('Error durante el seed:', error.message);
  }
}

seed();
