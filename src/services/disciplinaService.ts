const API_BASE = 'http://localhost:8080'

// ─── ADMIN ────────────────────────────────────────────────
export async function listarTodasDisciplinas(pagina: number, itens: number) {
  const r = await fetch(`${API_BASE}/disciplinas?pagina=${pagina}&itens=${itens}`)
  if (!r.ok) throw new Error('Erro ao listar disciplinas.')
  return r.json()
}

// ─── POR CURSO ────────────────────────────────────────────
export async function fetchDisciplinasPorCurso(idCurso: number) {
  const r = await fetch(`${API_BASE}/disciplinas/${idCurso}/curso`)
  if (!r.ok) throw new Error('Erro ao buscar disciplinas do curso.')
  return r.json()
}

// ─── CRUD ─────────────────────────────────────────────────
export async function createDisciplina(payload: object) {
  const r = await fetch(`${API_BASE}/disciplinas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error('Erro ao criar disciplina.')
  return r.json()
}

export async function updateDisciplina(id: number, payload: object) {
  const r = await fetch(`${API_BASE}/disciplinas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error('Erro ao atualizar disciplina.')
  return r.json()
}

export async function deleteDisciplina(id: number) {
  const r = await fetch(`${API_BASE}/disciplinas/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Erro ao excluir disciplina.')
}