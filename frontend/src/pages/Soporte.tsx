import React, { useState } from 'react';
import { FiPhoneCall, FiUsers, FiGlobe, FiMail, FiLinkedin, FiGithub, FiHeadphones } from 'react-icons/fi';
import './Soporte.css';
import { equipo } from '../types/soporte-type';
import { ModalContacto } from '../components/soporte/ModalContacto';


export default function Soporte() {

    const [filtro, setFiltro] = useState('Todos');
    const [modalAbierto, setModalAbierto] = useState(false);
    const equipoFiltrado = equipo.filter((miembro) => {
        if (filtro === 'Todos') return true;
        return miembro.rol.toLowerCase().includes(filtro.toLowerCase());
    });

    return (
        <div className="soporte-container">
            {/* ENCABEZADO */}
            <header className="soporte-header">
                <div className="soporte-title-wrapper">
                    <FiPhoneCall className="icon-title" />
                    <h2>Soporte</h2>
                </div>
                <p className="soporte-subtitle">Conocé al equipo detrás de FinanceAI y cómo puede ayudarte.</p>
            </header>

            {/* BANNER PRINCIPAL */}
            <section className="soporte-banner">
                <div className="banner-texto">
                    <div className="banner-icon-bg">
                        <FiPhoneCall size={24} color="#059669" />
                    </div>
                    <div>
                        <h3>Estamos para ayudarte.</h3>
                        <p>Además de resolver dudas sobre la plataforma, podés conocer a las personas que forman parte del proyecto FinanceAI.</p>
                    </div>
                </div>
                <div className="banner-stats">
                    <div className="stat-item">
                        <FiUsers className="stat-icon" />
                        <div>
                            <strong>9 miembros</strong>
                            <span>Equipo comprometido</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <FiGlobe className="stat-icon" />
                        <div>
                            <strong>Multidisciplinario</strong>
                            <span>Perfiles especializados</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <FiMail className="stat-icon" />
                        <div>
                            <strong>Canal de contacto</strong>
                            <span>Escribinos cuando quieras</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN DEL EQUIPO */}
            <section className="equipo-section">
                <div className="equipo-header">
                    <h3>Nuestro equipo</h3>
                    <select
                        className="equipo-select"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Data">Data</option>
                    </select>
                </div>

                <div className="equipo-grid">
                    {equipoFiltrado.map((miembro) => (
                        <div key={miembro.id} className="equipo-card">
                            <div className="card-top">
                                <div
                                    className="avatar"
                                    style={{ backgroundColor: miembro.colorAvatar }}
                                >
                                    {miembro.iniciales}
                                </div>
                                <div className="card-info">
                                    <h4>{miembro.nombre}</h4>
                                    <span
                                        className="badge"
                                        style={{ backgroundColor: miembro.bgBadge, color: miembro.colorBadge }}
                                    >
                                        {miembro.rol}
                                    </span>
                                </div>
                            </div>
                            <p className="card-desc">{miembro.descripcion}</p>
                            <div className="card-footer">
                                <button className="icon-btn" aria-label="Email">
                                    <FiMail size={18} color="#6B7280" style={{ minWidth: '18px', minHeight: '18px' }} />
                                </button>
                                <button className="icon-btn" aria-label="LinkedIn">
                                    <FiLinkedin size={18} color="#6B7280" style={{ minWidth: '18px', minHeight: '18px' }} />
                                </button>
                                <button className="icon-btn" aria-label="GitHub">
                                    <FiGithub size={18} color="#6B7280" style={{ minWidth: '18px', minHeight: '18px' }} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        <div className="soporte-footer">
                <div className="footer-icon-wrapper">
                    <FiHeadphones size={24} color="#059669" />
                </div>

                <div className="soporte-footer_text">
                    <h4>¿Tenés dudas o necesitás ayuda?</h4>
                    <p>Estamos para ayudarte. Podés escribirnos y te responderemos lo antes posible.</p>
                </div>

                <button className="btn-footer" onClick={() => setModalAbierto(true)}>
                    <FiMail size={18} color="#FFFFFF" /> Contactar soporte
                </button>
            </div>

            <ModalContacto isOpen={modalAbierto} onClose={() => setModalAbierto(false)} />
        </div>
    );
}
