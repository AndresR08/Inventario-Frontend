import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BusinessConfigForm = () => {
  const [config, setConfig] = useState({
    businessName: '',
    attributes: [] // Ejemplo: [{ name: 'Talla', type: 'string' }]
  });
  const [newAttribute, setNewAttribute] = useState({ name: '', type: 'string' });
  const [message, setMessage] = useState('');

  // Función para obtener la configuración actual
  const fetchConfig = async () => {
    try {
      const res = await axios.get('/api/business-config', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setConfig(res.data);
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Manejar cambios en el formulario principal
  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  // Agregar un nuevo atributo al arreglo
  const addAttribute = () => {
    if (newAttribute.name.trim() === '') return;
    setConfig({ ...config, attributes: [...config.attributes, newAttribute] });
    setNewAttribute({ name: '', type: 'string' });
  };

  // Enviar la configuración actualizada al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/business-config', config, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setConfig(res.data);
      setMessage('Configuración actualizada correctamente.');
    } catch (error) {
      console.error('Error updating config:', error);
      setMessage('Error al actualizar la configuración.');
    }
  };

  return (
    <div>
      <h2>Configuración del Negocio</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Negocio:</label>
          <input
            type="text"
            name="businessName"
            value={config.businessName}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3>Atributos</h3>
          {config.attributes.map((attr, index) => (
            <div key={index}>
              <span>{attr.name} ({attr.type})</span>
            </div>
          ))}
          <div>
            <input
              type="text"
              placeholder="Nombre del atributo"
              value={newAttribute.name}
              onChange={(e) =>
                setNewAttribute({ ...newAttribute, name: e.target.value })
              }
            />
            <select
              value={newAttribute.type}
              onChange={(e) =>
                setNewAttribute({ ...newAttribute, type: e.target.value })
              }
            >
              <option value="string">Texto</option>
              <option value="number">Número</option>
            </select>
            <button type="button" onClick={addAttribute}>
              Agregar Atributo
            </button>
          </div>
        </div>
        <button type="submit">Guardar Configuración</button>
      </form>
    </div>
  );
};

export default BusinessConfigForm;

