  interface MiembroEquipo {
    id: string;
    nombre: string;
    iniciales: string;
    rol: string;
    descripcion: string;
    colorAvatar: string;
    colorBadge: string;
    bgBadge: string;
}

export  const equipo: MiembroEquipo[] = [
        {
            id: '1', nombre: 'Fernando Thiele', iniciales: 'FT', rol: 'Data Scientist',
            descripcion: 'Analiza datos y desarrolla modelos para generar insights financieros útiles.',
            colorAvatar: '#8B5CF6', colorBadge: '#059669', bgBadge: '#D1FAE5'
        },
        {
            id: '2', nombre: 'Juan Manuel Roldan', iniciales: 'JR', rol: 'Backend Developer',
            descripcion: 'Desarrolla la lógica del sistema y los servicios necesarios para conectar los distintos módulos.',
            colorAvatar: '#6366F1', colorBadge: '#2563EB', bgBadge: '#DBEAFE'
        },
        {
            id: '3', nombre: 'Magalí Aldana Suarez', iniciales: 'MS', rol: 'Frontend Developer',
            descripcion: 'Diseña e implementa interfaces claras, accesibles y coherentes con la experiencia de FinanceAI.',
            colorAvatar: '#0D9488', colorBadge: '#7C3AED', bgBadge: '#EDE9FE'
        },
        {
            id: '4', nombre: 'Thiago Baber Feli', iniciales: 'TB', rol: 'Full Stack Developer',
            descripcion: 'Trabaja en soluciones que conectan frontend y backend dentro de la aplicación.',
            colorAvatar: '#F59E0B', colorBadge: '#D97706', bgBadge: '#FEF3C7'
        },
        {
            id: '5', nombre: 'Lucia Evelyn Jantus', iniciales: 'LJ', rol: 'Data Scientist',
            descripcion: 'Analiza información financiera y desarrolla el modelo de perfil financiero.',
            colorAvatar: '#EC4899', colorBadge: '#059669', bgBadge: '#D1FAE5'
        },
        {
            id: '6', nombre: 'Matias Bueno', iniciales: 'MB', rol: 'Data Engineer',
            descripcion: 'Trabaja con datos, infraestructura y servicios necesarios para el procesamiento del sistema.',
            colorAvatar: '#10B981', colorBadge: '#0D9488', bgBadge: '#CCFBF1'
        },
        {
            id: '7', nombre: 'Alan Joel Romero', iniciales: 'AR', rol: 'Software Engineer',
            descripcion: 'Desarrolla funcionalidades del sistema y colabora en la arquitectura e integración.',
            colorAvatar: '#3B82F6', colorBadge: '#7C3AED', bgBadge: '#EDE9FE'
        },
        {
            id: '8', nombre: 'Yanacelly Moreira', iniciales: 'YM', rol: 'Project Manager',
            descripcion: 'Coordina al equipo, organiza tareas y acompaña el avance general del proyecto.',
            colorAvatar: '#F43F5E', colorBadge: '#E11D48', bgBadge: '#FFE4E6'
        },
        {
            id: '9', nombre: 'Leandro Baque', iniciales: 'LB', rol: 'Autonomous Agent Engineer',
            descripcion: 'Trabaja en automatización e integración de soluciones inteligentes dentro del proyecto.',
            colorAvatar: '#0284C7', colorBadge: '#2563EB', bgBadge: '#DBEAFE'
        }
    ];
