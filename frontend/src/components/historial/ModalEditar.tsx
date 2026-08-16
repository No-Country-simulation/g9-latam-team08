import React, { useState, useEffect } from 'react';
import './ModalEditar.css';


interface ModalEditarProps {
  isOpen: boolean;
  onClose: () => void;
  transaccion: any;
  onGuardar: (transaccionActualizada: any) => void;
}

export const ModalEditar: React.FC<ModalEditarProps> = ({ isOpen, onClose, transaccion, onGuardar }) => {

  // Estado local para los inputs del formulario
  const [formData, setFormData] = useState(transaccion);

  // Si cambia la transacción seleccionada, actualizamos el formulario
  useEffect(() => {
    setFormData(transaccion);
  }, [transaccion]);

if (!isOpen || !transaccion || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Transacción</h3>
        <form onSubmit={handleSubmit}>

          <label>Descripción:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />

          <label>Monto:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />


          <div className="modal-acciones">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};
