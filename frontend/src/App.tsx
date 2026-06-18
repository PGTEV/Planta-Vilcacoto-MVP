import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  Truck, Warehouse, Recycle, Leaf, PackageSearch, 
  Trash2, Wind, BarChart3, Menu, Activity, Droplets, TrendingUp, CheckCircle, Scissors, Minimize2
} from 'lucide-react';

const API_URL = 'http://localhost:3000';

const MENU_ITEMS = [
  { path: '/', icon: BarChart3, label: 'Dashboard' },
  { path: '/recepcion', icon: Truck, label: '1. Recepción y Pesaje' },
  { path: '/almacenamiento', icon: Warehouse, label: '2. Descarga Temporal' },
  { path: '/segregacion', icon: Recycle, label: '3. Segregación' },
  { path: '/trituracion', icon: Scissors, label: '4. Trituración' },
  { path: '/tratamiento', icon: Leaf, label: '5. Tratamiento Orgánico' },
  { path: '/compactacion', icon: Minimize2, label: '6. Compactación' },
  { path: '/inventario', icon: PackageSearch, label: '7. Materiales Reciclables' },
  { path: '/ambiental', icon: Droplets, label: '8. Tratamiento Lixiviados' },
  { path: '/disposicion', icon: Trash2, label: '9. Disposición Final' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="glass-panel" style={{ width: '280px', height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem', border: 'none', borderRight: '1px solid var(--glass-border)', borderRadius: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>
          <Leaf size={24} />
        </div>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Vilcacoto</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', borderRadius: '0.5rem', textDecoration: 'none',
                color: isActive ? 'var(--color-primary)' : 'var(--text-main)',
                background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                transition: 'all var(--transition-fast)',
                fontWeight: isActive ? 600 : 500,
              }}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// ---------------- UI COMPONENTS ----------------

const Dashboard = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>Dashboard Gerencial</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', color: '#3b82f6' }}><Truck size={24} /></div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Ingresos Hoy</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>42 Vehículos</p>
        </div>
      </div>
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: '#10b981' }}><Recycle size={24} /></div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Material Recuperado</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>18.5 Ton</p>
        </div>
      </div>
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%', color: '#f59e0b' }}><TrendingUp size={24} /></div>
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Eficiencia de Planta</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>76.4%</p>
        </div>
      </div>
    </div>
  </div>
);

const Recepcion = () => {
  const [activeTab, setActiveTab] = useState('ingreso');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Form states - Vehículos
  const [plateNumber, setPlateNumber] = useState('');
  const [type, setType] = useState('Compactador');
  const [maxCapacity, setMaxCapacity] = useState('');
  
  // Form states - Pesajes
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [origin, setOrigin] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [tareWeight, setTareWeight] = useState('');

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${API_URL}/vehicles`);
      setVehicles(res.data);
      if (res.data.length > 0 && !selectedVehicle) {
        setSelectedVehicle(res.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching vehicles', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'pesaje') {
      fetchVehicles();
    }
  }, [activeTab]);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleRegisterVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/vehicles`, {
        plateNumber,
        type,
        maxCapacityKg: parseFloat(maxCapacity)
      });
      showSuccess('Vehículo registrado exitosamente en la base de datos.');
      setPlateNumber('');
      setMaxCapacity('');
    } catch (error) {
      console.error(error);
      alert('Error al registrar vehículo');
    }
  };

  const handleRegisterWeighing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/weighings`, {
        vehicleId: selectedVehicle,
        origin,
        grossWeightKg: parseFloat(grossWeight),
        tareWeightKg: parseFloat(tareWeight)
      });
      showSuccess('Pesaje registrado exitosamente. (Peso Neto calculado en el Backend)');
      setGrossWeight('');
      setTareWeight('');
      setOrigin('');
    } catch (error) {
      console.error(error);
      alert('Error al registrar pesaje');
    }
  };

  const netWeightPreview = (grossWeight && tareWeight) ? parseFloat(grossWeight) - parseFloat(tareWeight) : 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>1. Recepción y Pesaje</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className={`btn ${activeTab === 'ingreso' ? 'btn-primary' : 'glass-panel'}`} onClick={() => setActiveTab('ingreso')}>Registro</button>
          <button className={`btn ${activeTab === 'pesaje' ? 'btn-primary' : 'glass-panel'}`} onClick={() => setActiveTab('pesaje')}>Pesaje</button>
        </div>
      </div>
      
      {successMsg && (
        <div style={{ background: '#10b981', color: 'white', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={20} /> {successMsg}
        </div>
      )}

      <div className="glass-panel" style={{ padding: '2rem', minHeight: '400px' }}>
        {activeTab === 'ingreso' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Nuevo Ingreso Vehicular</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleRegisterVehicle}>
              <div>
                <label className="input-label">Placa</label>
                <input required className="input-field" placeholder="ABC-123" value={plateNumber} onChange={e => setPlateNumber(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="input-label">Tipo</label>
                  <select className="input-field" value={type} onChange={e => setType(e.target.value)}>
                    <option>Compactador</option>
                    <option>Volquete</option>
                    <option>Furgón</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="input-label">Capacidad Máx (Kg)</label>
                  <input required type="number" className="input-field" placeholder="15000" value={maxCapacity} onChange={e => setMaxCapacity(e.target.value)} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>Registrar Vehículo en Base de Datos</button>
            </form>
          </div>
        )}
        {activeTab === 'pesaje' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Captura de Peso</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleRegisterWeighing}>
              <div>
                <label className="input-label">Vehículo</label>
                <select className="input-field" value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} required>
                  {vehicles.length === 0 && <option value="">No hay vehículos registrados...</option>}
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.plateNumber} - {v.type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="input-label">Origen / Procedencia</label>
                <input required className="input-field" placeholder="Zona Centro" value={origin} onChange={e => setOrigin(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="input-label">Peso Bruto (Kg)</label>
                  <input required type="number" max="100000" className="input-field" placeholder="18500" value={grossWeight} onChange={e => setGrossWeight(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="input-label">Tara (Kg)</label>
                  <input required type="number" max="100000" className="input-field" placeholder="8500" value={tareWeight} onChange={e => setTareWeight(e.target.value)} />
                </div>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px dashed var(--color-primary)', marginTop: '1rem', textAlign: 'center' }}>
                <span style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Peso Neto (Se calculará exactamente en backend)</span>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{netWeightPreview} Kg</span>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={vehicles.length === 0}>Guardar Pesaje en Base de Datos</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const Segregacion = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>3. Segregación o Clasificación</h1>
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Registro de Materiales Recuperados</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div><label className="input-label">Papel y Cartón</label><input type="number" className="input-field" placeholder="Kg" /></div>
        <div><label className="input-label">Plásticos (PET, PEAD)</label><input type="number" className="input-field" placeholder="Kg" /></div>
        <div><label className="input-label">Vidrio</label><input type="number" className="input-field" placeholder="Kg" /></div>
        <div><label className="input-label">Metales</label><input type="number" className="input-field" placeholder="Kg" /></div>
        <div><label className="input-label">Textiles</label><input type="number" className="input-field" placeholder="Kg" /></div>
        <div><label className="input-label">Fracción Orgánica</label><input type="number" className="input-field" placeholder="Kg" /></div>
      </div>
      <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Guardar Clasificación</button>
    </div>
  </div>
);

const Trituracion = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>4. Trituración</h1>
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Registro de Reducción de Tamaño</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div>
          <label className="input-label">Tipo de Material a Triturar</label>
          <select className="input-field">
            <option>Plásticos</option>
            <option>Papel y Cartón</option>
            <option>Metales</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}><label className="input-label">Lote ID</label><input type="text" className="input-field" placeholder="LOTE-001" /></div>
          <div style={{ flex: 1 }}><label className="input-label">Peso Triturado (Kg)</label><input type="number" className="input-field" placeholder="500" /></div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Registrar Trituración</button>
      </form>
    </div>
  </div>
);

const Tratamiento = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>5. Tratamiento de Residuos Orgánicos</h1>
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Bitácora de Transformación</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div>
          <label className="input-label">Tipo de Tratamiento</label>
          <select className="input-field">
            <option>Compostaje (Abono orgánico)</option>
            <option>Biodigestión (Biogás)</option>
          </select>
        </div>
        <div><label className="input-label">Lote / Pila ID</label><input type="text" className="input-field" placeholder="LOTE-ORG-001" /></div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}><label className="input-label">Temperatura (°C)</label><input type="number" className="input-field" placeholder="65" /></div>
          <div style={{ flex: 1 }}><label className="input-label">Humedad (%)</label><input type="number" className="input-field" placeholder="50" /></div>
        </div>
        <div><label className="input-label">Producto Obtenido (Kg o m3)</label><input type="number" className="input-field" placeholder="Cantidad" /></div>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Registrar Monitoreo</button>
      </form>
    </div>
  </div>
);

const Compactacion = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>6. Compactación</h1>
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Compresión de No Aprovechables</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div><label className="input-label">Lote ID</label><input type="text" className="input-field" placeholder="COMP-001" /></div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}><label className="input-label">Peso Original (Kg)</label><input type="number" className="input-field" placeholder="1000" /></div>
          <div style={{ flex: 1 }}><label className="input-label">Volumen Compactado (m3)</label><input type="number" className="input-field" placeholder="2.5" /></div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Registrar Compactación</button>
      </form>
    </div>
  </div>
);

const Ambiental = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>8. Tratamiento de Lixiviados</h1>
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Droplets size={32} color="#3b82f6" />
        <h2 style={{ margin: 0 }}>Monitoreo Químico</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div><label className="input-label">pH</label><input type="number" className="input-field" placeholder="7.2" /></div>
        <div><label className="input-label">DBO (mg/L)</label><input type="number" className="input-field" placeholder="300" /></div>
        <div><label className="input-label">DQO (mg/L)</label><input type="number" className="input-field" placeholder="800" /></div>
      </div>
      <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Registrar Parámetros</button>
    </div>
  </div>
);

const Almacenamiento = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>2. Descarga y Almacenamiento Temporal</h1>
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Asignar Vehículo a Bahía</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div>
          <label className="input-label">ID del Pesaje (Vehículo)</label>
          <input type="text" className="input-field" placeholder="Buscar camión pesado recientemente..." />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label className="input-label">Zona / Bahía</label>
            <select className="input-field">
              <option>Bahía de Recepción A (Inorgánicos)</option>
              <option>Bahía de Recepción B (Orgánicos)</option>
              <option>Zona de Cuarentena</option>
            </select>
          </div>
        </div>
        <div>
          <label className="input-label">Notas de Inspección</label>
          <input type="text" className="input-field" placeholder="Material viene muy húmedo, posible penalidad..." />
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Asignar a Bahía</button>
      </form>
    </div>
  </div>
);

const Inventario = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>7. Almacenamiento de Materiales Reciclables</h1>
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Registrar en Inventario Final</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div>
          <label className="input-label">Tipo de Material Recuperado</label>
          <select className="input-field">
            <option>Plástico PET Fardos</option>
            <option>Papel y Cartón Fardos</option>
            <option>Abono Orgánico (Compost)</option>
            <option>Vidrio Triturado</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}><label className="input-label">Cantidad (Kg)</label><input type="number" className="input-field" placeholder="1500" /></div>
          <div style={{ flex: 1 }}><label className="input-label">Ubicación Física</label><input type="text" className="input-field" placeholder="Almacén 2" /></div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Añadir al Inventario</button>
      </form>
    </div>
  </div>
);

const DisposicionFinal = () => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>9. Disposición Final (Relleno Sanitario)</h1>
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Despacho de Rechazos</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div><label className="input-label">Destino</label><input type="text" className="input-field" placeholder="Relleno Sanitario Municipal" /></div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}><label className="input-label">Volumen (m3)</label><input type="number" className="input-field" placeholder="10" /></div>
          <div style={{ flex: 1 }}><label className="input-label">Peso Estimado (Kg)</label><input type="number" className="input-field" placeholder="4000" /></div>
        </div>
        <div><label className="input-label">Placa de Vehículo de Transporte</label><input type="text" className="input-field" placeholder="XYZ-987" /></div>
        <button className="btn btn-primary" style={{ marginTop: '1rem', backgroundColor: '#ef4444' }}>Registrar Salida a Disposición Final</button>
      </form>
    </div>
  </div>
);

// Generic wrapper for the rest
const GenericModule = ({ title }: { title: string }) => (
  <div>
    <h1 style={{ marginBottom: '1.5rem' }}>{title}</h1>
    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      <Activity size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
      <h2>Módulo Operativo</h2>
      <p>Interfaz de control en despliegue.</p>
    </div>
  </div>
);

// ---------------- APP LAYOUT ----------------

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: sidebarOpen ? '280px' : '0', transition: 'width var(--transition-normal)', overflow: 'hidden', flexShrink: 0 }}>
        <Sidebar />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header className="glass-panel" style={{ margin: '1rem 1rem 0 1rem', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '1rem' }}>
          <button className="btn" style={{ background: 'transparent', padding: '0.5rem' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} style={{ color: 'var(--text-main)' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Gerencia Vilcacoto</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>admin@vilcacoto.gob</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              G
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recepcion" element={<Recepcion />} />
            <Route path="/almacenamiento" element={<Almacenamiento />} />
            <Route path="/segregacion" element={<Segregacion />} />
            <Route path="/trituracion" element={<Trituracion />} />
            <Route path="/tratamiento" element={<Tratamiento />} />
            <Route path="/compactacion" element={<Compactacion />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/ambiental" element={<Ambiental />} />
            <Route path="/disposicion" element={<DisposicionFinal />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <style>{`.input-label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem; color: var(--text-main); }`}</style>
      <AppContent />
    </Router>
  );
}
