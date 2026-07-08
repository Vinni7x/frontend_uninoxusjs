const API_BASE = 'http://localhost:8080'

// ─── ADMIN ────────────────────────────────────────────────
export async function listarTodasTurmas(pagina: number, itens: number) {
  const r = await fetch(`${API_BASE}/turmas?pagina=${pagina}&itens=${itens}`)
  if (!r.ok) throw new Error('Erro ao listar turmas.')
  return r.json()
}

// ─── PROFESSOR ────────────────────────────────────────────
export async function fetchTurmasMinistradas(idProfessor: number) {
  const r = await fetch(`${API_BASE}/turmas/${idProfessor}/turmasministradas`)
  if (!r.ok) throw new Error('Erro ao buscar turmas ministradas.')
  return r.json()
}

// ─── ALUNO ────────────────────────────────────────────────
export async function fetchTurmasAbertas(idCurso: number, matriculaAluno: number) {
  const r = await fetch(`${API_BASE}/turmas/${idCurso}/turmasabertas/${matriculaAluno}`)
  if (!r.ok) throw new Error('Erro ao buscar turmas abertas.')
  return r.json()
}

export async function fetchTurmasMatriculadas(matriculaAluno: number) {
  const r = await fetch(`${API_BASE}/turmas/${matriculaAluno}/turmasmatricula`)
  if (!r.ok) throw new Error('Erro ao buscar turmas matriculadas.')
  return r.json()
}

// ─── ADMIN - MATRÍCULAS DA TURMA ──────────────────────────
export async function fetchMatriculasPendentes(idTurma: number, pagina: number, itens: number) {
  const r = await fetch(`${API_BASE}/alunos/${idTurma}/solicitacaoalunos?pagina=${pagina}&itens=${itens}`)
  if (!r.ok) throw new Error('Erro ao buscar matrículas pendentes.')
  return r.json()
}

// ─── CRUD ─────────────────────────────────────────────────
export async function createTurma(payload: object) {
  const r = await fetch(`${API_BASE}/turmas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error('Erro ao criar turma.')
  return r.json()
}

export async function updateTurma(id: number, payload: object) {
  const r = await fetch(`${API_BASE}/turmas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error('Erro ao atualizar turma.')
  return r.json()
}

export async function deleteTurma(id: number) {
  const r = await fetch(`${API_BASE}/turmas/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Erro ao excluir turma.')
}

export async function consolidarTurma(id: number) {
  const r = await fetch(`${API_BASE}/turmas/${id}/consolidar`, { method: 'POST' })
  if (!r.ok) throw new Error('Erro ao consolidar turma.')
}