const API_BASE = 'http://localhost:8081'

export async function fetchAluno(id: number) {
   const r = await fetch(`${API_BASE}/alunos/${id}`);
  if (!r.ok) throw new Error('Erro ao buscar perfil do aluno.');
  return r.json();
}

export async function fetchTurmas(id: number) {
  const r = await fetch(`${API_BASE}/turmas/${id}/turmasmatricula`);
  if (!r.ok) throw new Error('Erro ao buscar turmas.');
  return r.json();
}

export async function fetchProvas(id: number) {
    const r = await fetch(`${API_BASE}/avaliacoes/${id}/provas`);
  if (!r.ok) throw new Error('Erro ao buscar provas.');
  return r.json();
}