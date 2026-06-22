const API_BASE = 'http://localhost:8080'

export async function fetchAluno(id: number) {
   const r = await fetch(`${API_BASE}/cursos/${id}`);
  if (!r.ok) throw new Error('Erro ao buscar curso.');
  return r.json();
}

export async function fetchTurmas(id: number) {
  const r = await fetch(`${API_BASE}/professores/${id}/professorcurso`);
  if (!r.ok) throw new Error('Erro ao buscar professores.');
  return r.json();
}

export async function fetchProvas(id: number) {
    const r = await fetch(`${API_BASE}/turmas/${id}/turmascursos`);
  if (!r.ok) throw new Error('Erro ao buscar turmas.');
  return r.json();
}
export async function listarTodosCursos(pagina: number, itens: number) {
    const r = await fetch(`${API_BASE}/cursos?pagina=${pagina}&itens=${itens}`);
    if (!r.ok) throw new Error('Erro ao listar cursos.');
    return r.json(); 
}