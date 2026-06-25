import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  Truck, Warehouse, Recycle, Leaf, PackageSearch, 
  Trash2, Wind, BarChart3, Menu, Activity, Droplets, TrendingUp, CheckCircle, Scissors, Minimize2, Info
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

// ---------------- SHARED COMPONENTS ----------------
const ModuleHeader = ({ title, description, benefits }: { title: string, description: string, benefits: string }) => (
  <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '1rem', borderLeft: '4px solid #3b82f6', color: 'var(--text-main)' }}>
    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: '#3b82f6' }}>
      <Info size={24} color="#3b82f6" /> {title}
    </h2>
    <p style={{ margin: '0 0 0.5rem 0', lineHeight: 1.5 }}><strong>¿Para qué sirve?</strong> {description}</p>
    <p style={{ margin: 0, color: '#10b981', fontWeight: 500 }}>✓ <strong>Beneficio:</strong> {benefits}</p>
  </div>
);

const DataTable = ({ columns, data }: { columns: string[], data: any[] }) => (
  <div style={{ overflowX: 'auto', marginTop: '2rem', background: 'var(--bg-glass)', borderRadius: '0.5rem', border: '1px solid var(--glass-border)' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '2px solid var(--glass-border)' }}>
        <tr>
          {columns.map((col, i) => <th key={i} style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td colSpan={columns.length} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay registros disponibles.</td></tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
              {Object.values(row).map((val: any, j) => (
                <td key={j} style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>{val}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

// Helper for formatting kg to tons
const kgToTon = (kg: number) => (kg / 1000).toFixed(2);

// ---------------- UI COMPONENTS ----------------

const Dashboard = () => {
  const [stats, setStats] = useState({ vehicles: 0, recoveredTon: 0, efficiency: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [wRes, sRes] = await Promise.all([
          axios.get(`${API_URL}/weighings`),
          axios.get(`${API_URL}/segregations`)
        ]);

        const weighings = wRes.data;
        const segregations = sRes.data;

        const vehiclesCount = weighings.length;
        const totalNetWeightKg = weighings.reduce((sum: number, w: any) => sum + Number(w.netWeightKg), 0);
        
        const totalRecoveredKg = segregations.reduce((sum: number, s: any) => 
          sum + Number(s.paperWeightKg) + Number(s.plasticsWeightKg) + Number(s.glassWeightKg) + 
          Number(s.metalsWeightKg) + Number(s.textilesWeightKg) + Number(s.organicWeightKg), 0
        );

        const efficiency = totalNetWeightKg > 0 ? (totalRecoveredKg / totalNetWeightKg) * 100 : 0;

        setStats({
          vehicles: vehiclesCount,
          recoveredTon: totalRecoveredKg / 1000,
          efficiency: efficiency
        });
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Dashboard Gerencial</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%', color: '#3b82f6' }}><Truck size={24} /></div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Ingresos Totales (Histórico)</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.vehicles} Vehículos</p>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: '#10b981' }}><Recycle size={24} /></div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Material Recuperado</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.recoveredTon.toFixed(2)} Ton</p>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%', color: '#f59e0b' }}><TrendingUp size={24} /></div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Eficiencia de Planta</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.efficiency.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Recepcion = () => {
  const [activeTab, setActiveTab] = useState('ingreso');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [weighings, setWeighings] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Form states (Tons)
  const [plateNumber, setPlateNumber] = useState('');
  const [type, setType] = useState('Compactador');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [origin, setOrigin] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [tareWeight, setTareWeight] = useState('');

  const fetchData = async () => {
    try {
      const vRes = await axios.get(`${API_URL}/vehicles`);
      setVehicles(vRes.data);
      if (vRes.data.length > 0 && !selectedVehicle) setSelectedVehicle(vRes.data[0].id);
      
      const wRes = await axios.get(`${API_URL}/weighings`);
      setWeighings(wRes.data);
    } catch (error) { console.error('Error fetching data', error); }
  };

  useEffect(() => { fetchData(); }, []);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleRegisterVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Multiply by 1000 to save as Kg
      await axios.post(`${API_URL}/vehicles`, { plateNumber, type, maxCapacityKg: parseFloat(maxCapacity) * 1000 });
      showSuccess('Vehículo registrado exitosamente en la base de datos.');
      setPlateNumber(''); setMaxCapacity('');
      fetchData();
    } catch (error: any) { alert('Error al registrar vehículo: Es posible que esta placa ya esté registrada.'); }
  };

  const handleRegisterWeighing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Multiply by 1000 to save as Kg
      await axios.post(`${API_URL}/weighings`, { vehicleId: selectedVehicle, origin, grossWeightKg: parseFloat(grossWeight) * 1000, tareWeightKg: parseFloat(tareWeight) * 1000 });
      showSuccess('Pesaje registrado exitosamente.');
      setGrossWeight(''); setTareWeight(''); setOrigin('');
      fetchData();
    } catch (error) { alert('Error al registrar pesaje'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>1. Recepción y Pesaje</h1>
      <ModuleHeader 
        title="Control de Ingreso a Planta" 
        description="Aquí registras los camiones nuevos y pesas los que entran y salen. El sistema calcula automáticamente el peso neto de la basura." 
        benefits="Digitalizar esto automatiza los cálculos, evita errores humanos en el papel y previene sobrepesos no declarados."
      />

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button className={`btn ${activeTab === 'ingreso' ? 'btn-primary' : 'glass-panel'}`} onClick={() => setActiveTab('ingreso')}>Registro de Camiones</button>
        <button className={`btn ${activeTab === 'pesaje' ? 'btn-primary' : 'glass-panel'}`} onClick={() => setActiveTab('pesaje')}>Balanza de Pesaje</button>
      </div>
      
      {successMsg && <div style={{ background: '#10b981', color: 'white', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} /> {successMsg}</div>}

      <div className="glass-panel" style={{ padding: '2rem' }}>
        {activeTab === 'ingreso' && (
          <>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }} onSubmit={handleRegisterVehicle}>
              <div><label className="input-label">Placa</label><input required className="input-field" placeholder="ABC-123" value={plateNumber} onChange={e => setPlateNumber(e.target.value)} /></div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}><label className="input-label">Tipo</label><select className="input-field" value={type} onChange={e => setType(e.target.value)}><option>Compactador</option><option>Volquete</option><option>Furgón</option></select></div>
                <div style={{ flex: 1 }}><label className="input-label">Capacidad Máx (Ton)</label><input required type="number" step="0.01" className="input-field" placeholder="15.0" value={maxCapacity} onChange={e => setMaxCapacity(e.target.value)} /></div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>Registrar Vehículo</button>
            </form>
            <DataTable columns={['ID', 'Placa', 'Tipo', 'Cap. Max (Ton)']} data={vehicles.map(v => ({ id: v.id.slice(0,8), plate: v.plateNumber, type: v.type, max: kgToTon(v.maxCapacityKg) }))} />
          </>
        )}
        {activeTab === 'pesaje' && (
          <>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }} onSubmit={handleRegisterWeighing}>
              <div>
                <label className="input-label">Vehículo</label>
                <select className="input-field" value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} required>
                  {vehicles.length === 0 && <option value="">No hay vehículos...</option>}
                  {vehicles.map(v => <option key={v.id} value={v.id}>{v.plateNumber} - {v.type}</option>)}
                </select>
              </div>
              <div><label className="input-label">Origen / Procedencia</label><input required className="input-field" placeholder="Zona Centro" value={origin} onChange={e => setOrigin(e.target.value)} /></div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}><label className="input-label">Peso Bruto (Ton)</label><input required type="number" step="0.01" className="input-field" placeholder="18.5" value={grossWeight} onChange={e => setGrossWeight(e.target.value)} /></div>
                <div style={{ flex: 1 }}><label className="input-label">Tara (Ton)</label><input required type="number" step="0.01" className="input-field" placeholder="8.5" value={tareWeight} onChange={e => setTareWeight(e.target.value)} /></div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Guardar Pesaje</button>
            </form>
            <DataTable columns={['ID Pesaje', 'Vehículo', 'Origen', 'P. Bruto (Ton)', 'Tara (Ton)', 'P. Neto (Ton)', 'Fecha']} data={weighings.map(w => ({ id: w.id.slice(0,8), v: w.vehicle?.plateNumber || w.vehicleId.slice(0,8), o: w.origin, pb: kgToTon(w.grossWeightKg), t: kgToTon(w.tareWeightKg), pn: kgToTon(w.netWeightKg), d: new Date(w.createdAt).toLocaleString() }))} />
          </>
        )}
      </div>
    </div>
  );
};

const Almacenamiento = () => {
  const [storages, setStorages] = useState<any[]>([]);
  const [weighings, setWeighings] = useState<any[]>([]);
  
  const [weighingId, setWeighingId] = useState('');
  const [zone, setZone] = useState('Plataforma de Descarga General');
  const [notes, setNotes] = useState('');

  const fetchData = async () => {
    try { 
      const res = await axios.get(`${API_URL}/storage`); setStorages(res.data); 
      const wRes = await axios.get(`${API_URL}/weighings`); 
      setWeighings(wRes.data);
      if (wRes.data.length > 0 && !weighingId) setWeighingId(wRes.data[0].id);
    } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/storage`, { weighingId, zone, notes });
      setNotes('');
      fetchData();
    } catch (error) { alert('Error al asignar vehículo.'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>2. Descarga y Almacenamiento Temporal</h1>
      <ModuleHeader 
        title="Asignación de Zonas de Descarga" 
        description="Indica en qué área de la planta debe descargar cada camión luego de haber sido pesado." 
        benefits="Mantiene un registro exacto de dónde está la basura de cada procedencia, facilitando inspecciones y evitando cuellos de botella."
      />
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }} onSubmit={handleSubmit}>
          <div>
            <label className="input-label">Seleccionar Pesaje (Camión que acaba de ingresar)</label>
            <select className="input-field" value={weighingId} onChange={e=>setWeighingId(e.target.value)} required>
              {weighings.length === 0 && <option value="">No hay pesajes registrados...</option>}
              {weighings.map(w => <option key={w.id} value={w.id}>{w.vehicle?.plateNumber || 'ID:'+w.id.slice(0,8)} - Neto: {kgToTon(w.netWeightKg)} Ton</option>)}
            </select>
          </div>
          <div><label className="input-label">Zona / Plataforma de Descarga</label><select className="input-field" value={zone} onChange={e=>setZone(e.target.value)}><option>Plataforma de Descarga General</option><option>Bahía de Recepción Secundaria</option><option>Zona de Cuarentena (Material Peligroso)</option></select></div>
          <div><label className="input-label">Notas de Inspección</label><input type="text" className="input-field" placeholder="Material viene muy húmedo..." value={notes} onChange={e=>setNotes(e.target.value)} /></div>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Asignar a Bahía</button>
        </form>
        <DataTable columns={['ID', 'Camión Asignado (ID Pesaje)', 'Zona / Bahía', 'Notas', 'Fecha']} data={storages.map(s => ({ id: s.id.slice(0,8), wId: s.weighing?.vehicle?.plateNumber || s.weighingId.slice(0,8), z: s.zone, n: s.notes, d: new Date(s.recordedAt).toLocaleString() }))} />
      </div>
    </div>
  );
};

const Segregacion = () => {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({ paper: '', plastics: '', glass: '', metals: '', textiles: '', organics: '' });

  const fetchData = async () => {
    try { const res = await axios.get(`${API_URL}/segregations`); setData(res.data); } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/segregations`, {
        paperWeightKg: parseFloat(form.paper||'0') * 1000,
        plasticsWeightKg: parseFloat(form.plastics||'0') * 1000,
        glassWeightKg: parseFloat(form.glass||'0') * 1000,
        metalsWeightKg: parseFloat(form.metals||'0') * 1000,
        textilesWeightKg: parseFloat(form.textiles||'0') * 1000,
        organicWeightKg: parseFloat(form.organics||'0') * 1000,
      });
      setForm({ paper: '', plastics: '', glass: '', metals: '', textiles: '', organics: '' });
      fetchData();
    } catch (error) { alert('Error al guardar segregación'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>3. Segregación o Clasificación</h1>
      <ModuleHeader 
        title="Registro de Materiales Separados" 
        description="Anota el peso exacto en Toneladas de todo el material que los operarios lograron rescatar de la faja transportadora en un turno." 
        benefits="Permite a la gerencia saber qué tan eficiente es la planta (Tasa de Recuperación) y evita pérdida o robo de materiales valiosos."
      />
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div><label className="input-label">Papel y Cartón (Ton)</label><input type="number" step="0.01" className="input-field" placeholder="0.5" value={form.paper} onChange={e=>setForm({...form, paper: e.target.value})} /></div>
            <div><label className="input-label">Plásticos PET/PEAD (Ton)</label><input type="number" step="0.01" className="input-field" placeholder="1.2" value={form.plastics} onChange={e=>setForm({...form, plastics: e.target.value})} /></div>
            <div><label className="input-label">Vidrio (Ton)</label><input type="number" step="0.01" className="input-field" placeholder="0.8" value={form.glass} onChange={e=>setForm({...form, glass: e.target.value})} /></div>
            <div><label className="input-label">Metales (Ton)</label><input type="number" step="0.01" className="input-field" placeholder="0.3" value={form.metals} onChange={e=>setForm({...form, metals: e.target.value})} /></div>
            <div><label className="input-label">Textiles (Ton)</label><input type="number" step="0.01" className="input-field" placeholder="0.1" value={form.textiles} onChange={e=>setForm({...form, textiles: e.target.value})} /></div>
            <div><label className="input-label">Orgánicos (Ton)</label><input type="number" step="0.01" className="input-field" placeholder="6.0" value={form.organics} onChange={e=>setForm({...form, organics: e.target.value})} /></div>
          </div>
          <button className="btn btn-primary">Guardar Clasificación</button>
        </form>
        <DataTable columns={['ID', 'Papel (Ton)', 'Plástico (Ton)', 'Vidrio (Ton)', 'Metales (Ton)', 'Textiles (Ton)', 'Orgánico (Ton)', 'Fecha']} data={data.map(d => ({ id: d.id.slice(0,8), p: kgToTon(d.paperWeightKg), pl: kgToTon(d.plasticsWeightKg), g: kgToTon(d.glassWeightKg), m: kgToTon(d.metalsWeightKg), t: kgToTon(d.textilesWeightKg), o: kgToTon(d.organicWeightKg), date: new Date(d.dateRecorded).toLocaleString() }))} />
      </div>
    </div>
  );
};

const Trituracion = () => {
  const [data, setData] = useState<any[]>([]);
  const [batchId, setBatchId] = useState('');
  const [materialType, setMaterialType] = useState('Plásticos');
  const [weight, setWeight] = useState('');

  const fetchData = async () => {
    try { const res = await axios.get(`${API_URL}/crushing`); setData(res.data); } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/crushing`, { batchId, materialType, crushedWeightKg: parseFloat(weight) * 1000 });
      setBatchId(''); setWeight(''); fetchData();
    } catch (error) { alert('Error'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>4. Trituración</h1>
      <ModuleHeader 
        title="Reducción de Tamaño" 
        description="Registra la cantidad de toneladas de plástico o vidrio que pasan por las máquinas trituradoras." 
        benefits="Lleva el control de uso de las máquinas y mantiene el rastro de cuántos kilos de material picado tenemos."
      />
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }} onSubmit={handleSubmit}>
          <div><label className="input-label">Tipo de Material</label><select className="input-field" value={materialType} onChange={e=>setMaterialType(e.target.value)}><option>Plásticos</option><option>Vidrio</option><option>Metales</option></select></div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}><label className="input-label">Código Lote (Ej: PET-01)</label><input required type="text" className="input-field" value={batchId} onChange={e=>setBatchId(e.target.value)} /></div>
            <div style={{ flex: 1 }}><label className="input-label">Peso Triturado (Ton)</label><input required type="number" step="0.01" className="input-field" placeholder="0.8" value={weight} onChange={e=>setWeight(e.target.value)} /></div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Registrar Trituración</button>
        </form>
        <DataTable columns={['ID', 'Material', 'Lote', 'Peso Triturado (Ton)', 'Fecha']} data={data.map(d => ({ id: d.id.slice(0,8), m: d.materialType, b: d.batchId, w: kgToTon(d.crushedWeightKg), date: new Date(d.recordedAt).toLocaleString() }))} />
      </div>
    </div>
  );
};

const Tratamiento = () => {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({ type: 'Compostaje', batchId: '', temp: '', hum: '', vol: '' });

  const fetchData = async () => {
    try { const res = await axios.get(`${API_URL}/treatments`); setData(res.data); } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/treatments`, { treatmentType: form.type, batchId: form.batchId, temperatureCelsius: parseFloat(form.temp||'0'), humidityPercentage: parseFloat(form.hum||'0'), producedVolume: parseFloat(form.vol||'0') });
      setForm({ ...form, batchId: '', temp: '', hum: '', vol: '' }); fetchData();
    } catch (error) { alert('Error'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>5. Tratamiento de Residuos Orgánicos</h1>
      <ModuleHeader 
        title="Bitácora de Compost y Biogás" 
        description="Lleva el registro diario de temperatura y humedad de tus pilas de compostaje o biodigestores para asegurar que el proceso biológico no falle." 
        benefits="Digitalizar esta bitácora asegura calidad técnica, alerta de problemas térmicos y registra cuánto producto útil se genera."
      />
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }} onSubmit={handleSubmit}>
          <div><label className="input-label">Tipo de Tratamiento</label><select className="input-field" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}><option>Compostaje</option><option>Biodigestión (Biogás)</option></select></div>
          <div><label className="input-label">Lote / Pila ID</label><input required className="input-field" placeholder="PILA-ORG-01" value={form.batchId} onChange={e=>setForm({...form, batchId: e.target.value})} /></div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}><label className="input-label">Temperatura (°C)</label><input type="number" className="input-field" value={form.temp} onChange={e=>setForm({...form, temp: e.target.value})} /></div>
            <div style={{ flex: 1 }}><label className="input-label">Humedad (%)</label><input type="number" className="input-field" value={form.hum} onChange={e=>setForm({...form, hum: e.target.value})} /></div>
          </div>
          <div><label className="input-label">Volumen Obtenido Final (Al cosechar)</label><input type="number" className="input-field" value={form.vol} onChange={e=>setForm({...form, vol: e.target.value})} /></div>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Registrar Monitoreo</button>
        </form>
        <DataTable columns={['ID', 'Tratamiento', 'Lote', 'Temp (°C)', 'Humedad (%)', 'Volumen Final', 'Fecha']} data={data.map(d => ({ id: d.id.slice(0,8), t: d.treatmentType, b: d.batchId, tc: d.temperatureCelsius, h: d.humidityPercentage, v: d.producedVolume, date: new Date(d.recordedAt).toLocaleString() }))} />
      </div>
    </div>
  );
};

const Compactacion = () => {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({ batchId: '', weight: '', vol: '' });

  const fetchData = async () => {
    try { const res = await axios.get(`${API_URL}/compaction`); setData(res.data); } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/compaction`, { batchId: form.batchId, originalWeightKg: parseFloat(form.weight) * 1000, compactedVolumeM3: parseFloat(form.vol) });
      setForm({ batchId: '', weight: '', vol: '' }); fetchData();
    } catch (error) { alert('Error'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>6. Compactación</h1>
      <ModuleHeader 
        title="Compresión de Rechazos" 
        description="Anota cuántas toneladas entran a la prensa hidráulica y cuál es el tamaño final en metros cúbicos del cubo aplastado." 
        benefits="Nos ayuda a saber cuánto volumen de espacio estamos ahorrando para el transporte hacia el relleno sanitario."
      />
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }} onSubmit={handleSubmit}>
          <div><label className="input-label">Código Lote de Rechazo</label><input required className="input-field" placeholder="RECHAZO-01" value={form.batchId} onChange={e=>setForm({...form, batchId: e.target.value})} /></div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}><label className="input-label">Peso Original (Ton)</label><input required type="number" step="0.01" className="input-field" placeholder="2.3" value={form.weight} onChange={e=>setForm({...form, weight: e.target.value})} /></div>
            <div style={{ flex: 1 }}><label className="input-label">Volumen Compactado (m3)</label><input required type="number" step="0.01" className="input-field" placeholder="2.5" value={form.vol} onChange={e=>setForm({...form, vol: e.target.value})} /></div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Registrar Compactación</button>
        </form>
        <DataTable columns={['ID', 'Lote', 'Peso (Ton)', 'Volumen (m3)', 'Fecha']} data={data.map(d => ({ id: d.id.slice(0,8), b: d.batchId, w: kgToTon(d.originalWeightKg), v: d.compactedVolumeM3, date: new Date(d.recordedAt).toLocaleString() }))} />
      </div>
    </div>
  );
};

const Inventario = () => {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({ materialType: 'Plástico PET Fardos', quantityKg: '' });

  const fetchData = async () => {
    try { const res = await axios.get(`${API_URL}/inventory`); setData(res.data); } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/inventory`, { materialType: form.materialType, quantityKg: parseFloat(form.quantityKg) * 1000, location: 'Almacén Principal' });
      setForm({ ...form, quantityKg: '' }); fetchData();
    } catch (error) { alert('Error'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>7. Almacenamiento de Materiales Reciclables</h1>
      <ModuleHeader 
        title="Inventario de Productos Listos para Venta" 
        description="Ingresa aquí todo el material que ya ha sido procesado y que está listo para ser vendido o despachado." 
        benefits="Convierte la planta en un negocio real. El departamento comercial puede ver este stock en tiempo real sin tener que bajar al almacén."
      />
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }} onSubmit={handleSubmit}>
          <div><label className="input-label">Tipo de Material</label><select className="input-field" value={form.materialType} onChange={e=>setForm({...form, materialType: e.target.value})}><option>Plástico PET Fardos</option><option>Papel y Cartón Fardos</option><option>Abono Orgánico (Compost)</option><option>Vidrio Triturado</option></select></div>
          <div><label className="input-label">Cantidad (Ton)</label><input required type="number" step="0.01" className="input-field" placeholder="1.5" value={form.quantityKg} onChange={e=>setForm({...form, quantityKg: e.target.value})} /></div>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Añadir al Almacén Principal</button>
        </form>
        <DataTable columns={['ID', 'Material', 'Cantidad (Ton)', 'Ubicación', 'Fecha de Registro']} data={data.map(d => ({ id: d.id.slice(0,8), m: d.materialType, q: kgToTon(d.quantityKg), l: d.location, date: new Date(d.recordedAt).toLocaleString() }))} />
      </div>
    </div>
  );
};

const Ambiental = () => {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({ ph: '', dbo: '', dqo: '' });

  const fetchData = async () => {
    try { const res = await axios.get(`${API_URL}/environmental-logs`); setData(res.data); } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/environmental-logs`, { phLevel: parseFloat(form.ph), dboValue: parseFloat(form.dbo), dqoValue: parseFloat(form.dqo) });
      setForm({ ph: '', dbo: '', dqo: '' }); fetchData();
    } catch (error) { alert('Error'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>8. Tratamiento de Lixiviados</h1>
      <ModuleHeader 
        title="Control Químico y Monitoreo" 
        description="Registra los valores químicos de los jugos tóxicos (lixiviados) generados por los residuos orgánicos, tomados desde el laboratorio." 
        benefits="Protege a la planta de multas y cierres por parte del Ministerio del Ambiente al garantizar que los líquidos vertidos están limpios."
      />
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div><label className="input-label">pH</label><input required type="number" step="0.1" className="input-field" placeholder="7.2" value={form.ph} onChange={e=>setForm({...form, ph: e.target.value})} /></div>
            <div><label className="input-label">DBO (mg/L)</label><input required type="number" step="0.1" className="input-field" placeholder="300" value={form.dbo} onChange={e=>setForm({...form, dbo: e.target.value})} /></div>
            <div><label className="input-label">DQO (mg/L)</label><input required type="number" step="0.1" className="input-field" placeholder="800" value={form.dqo} onChange={e=>setForm({...form, dqo: e.target.value})} /></div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Registrar Parámetros</button>
        </form>
        <DataTable columns={['ID', 'pH', 'DBO (mg/L)', 'DQO (mg/L)', 'Fecha']} data={data.map(d => ({ id: d.id.slice(0,8), p: d.phLevel, db: d.dboValue, dq: d.dqoValue, date: new Date(d.recordedAt).toLocaleString() }))} />
      </div>
    </div>
  );
};

const DisposicionFinal = () => {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({ destination: '', vol: '', weight: '', plate: '' });

  const fetchData = async () => {
    try { const res = await axios.get(`${API_URL}/disposal`); setData(res.data); } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/disposal`, { destination: form.destination, volumeM3: parseFloat(form.vol), weightKg: parseFloat(form.weight) * 1000, vehiclePlate: form.plate });
      setForm({ destination: '', vol: '', weight: '', plate: '' }); fetchData();
    } catch (error) { alert('Error'); }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>9. Disposición Final (Relleno Sanitario)</h1>
      <ModuleHeader 
        title="Salida Definitiva de Residuos Inservibles" 
        description="Registra la salida física de todos los fardos compactados (rechazos) que ya no pueden ser reciclados y van rumbo al relleno sanitario de la ciudad." 
        benefits="Cierra el ciclo del sistema. Sabrás exactamente qué porcentaje de la basura original terminó aquí en lugar de ser reciclada."
      />
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }} onSubmit={handleSubmit}>
          <div><label className="input-label">Destino Final</label><input required type="text" className="input-field" placeholder="Relleno Sanitario Municipal" value={form.destination} onChange={e=>setForm({...form, destination: e.target.value})} /></div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}><label className="input-label">Volumen Total (m3)</label><input required type="number" step="0.01" className="input-field" placeholder="10.0" value={form.vol} onChange={e=>setForm({...form, vol: e.target.value})} /></div>
            <div style={{ flex: 1 }}><label className="input-label">Peso Estimado (Ton)</label><input required type="number" step="0.01" className="input-field" placeholder="4.0" value={form.weight} onChange={e=>setForm({...form, weight: e.target.value})} /></div>
          </div>
          <div><label className="input-label">Placa de Vehículo de Transporte</label><input required type="text" className="input-field" placeholder="XYZ-987" value={form.plate} onChange={e=>setForm({...form, plate: e.target.value})} /></div>
          <button className="btn btn-primary" style={{ marginTop: '1rem', backgroundColor: '#ef4444' }}>Registrar Salida a Relleno</button>
        </form>
        <DataTable columns={['ID', 'Destino', 'Volumen (m3)', 'Peso (Ton)', 'Placa Transporte', 'Fecha Salida']} data={data.map(d => ({ id: d.id.slice(0,8), dest: d.destination, v: d.volumeM3, w: kgToTon(d.weightKg), p: d.vehiclePlate, date: new Date(d.recordedAt).toLocaleString() }))} />
      </div>
    </div>
  );
};

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
      <style>{`
        /* Mejoras de contraste y modo oscuro */
        .input-label { 
          display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.875rem; color: var(--text-main); 
        }
        .input-field {
          background-color: var(--bg-glass) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: var(--text-main) !important;
        }
        .input-field:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2) !important;
        }
        .input-field option {
          background-color: #1e293b;
          color: white;
        }
        table th {
          background: rgba(255, 255, 255, 0.05) !important;
          color: var(--text-main) !important;
        }
      `}</style>
      <AppContent />
    </Router>
  );
}
