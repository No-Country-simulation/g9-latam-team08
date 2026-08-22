import React, { useState } from 'react';
import { FiMail, FiX } from 'react-icons/fi';
import './ModalContacto.css';

interface ModalContactoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalContacto: React.FC<ModalContactoProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de contacto enviados:', formData);
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Botón Cerrar (X) */}
        <button className="modal-btn-close" onClick={onClose} aria-label="Cerrar modal">
          <FiX size={20} />
        </button>

        {/* Cabecera */}
        <div className="modal-header-soporte">
          <div className="modal-icon-badge">
            <FiMail size={22} color="currentColor" />
          </div>
          <div>
            <h3>Contactar soporte</h3>
            <p>Contanos brevemente en qué podemos ayudarte.</p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row-grid">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Asunto</label>
            <input
              id="asunto"
              name="asunto"
              type="text"
              required
              placeholder="¿Sobre qué querés consultarnos?"
              value={formData.asunto}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              required
              placeholder="Describí tu consulta con el mayor detalle posible..."
              value={formData.mensaje}
              onChange={handleChange}
            />
          </div>

          {/* Botones de acción */}
          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-enviar">
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
