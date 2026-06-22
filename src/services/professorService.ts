const API_BASE = 'http://localhost:8080'

export async function fetchProfessores(id: number) {
   const r = await fetch(`${API_BASE}/professores/${id}`);
  if (!r.ok) throw new Error('Erro ao buscar perfil do professor.');
  return r.json();
}

export async function fetchTurmasMinistradas(id: number) {
  const r = await fetch(`${API_BASE}/turmas/${id}/turmasministradas`);
  if (!r.ok) throw new Error('Erro ao buscar turmas.');
  return r.json();
}

export async function fetchProvasProfessores(id: number) {
    const r = await fetch(`${API_BASE}/avaliacoes/${id}/provasProfessor`);
  if (!r.ok) throw new Error('Erro ao buscar provas.');
  return r.json();
}
export async function listarTodosProfessores(pagina: number, itens: number) {
    const r = await fetch(`${API_BASE}/professores?pagina=${pagina}&itens=${itens}`);
    if (!r.ok) throw new Error('Erro ao listar professores.');
    return r.json(); 
}