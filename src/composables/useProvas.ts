import { ref } from 'vue'

export function useProvas(role = 'aluno') {
  const loading = ref(false)
  const provas = ref([])
  const total = ref(0)
  const options = ref({ itemsPerPage: 10 })

  const headers = [
    { title: 'Data', key: 'data', sortable: true },
    { title: 'Disciplina', key: 'disciplina', sortable: true },
    { title: 'Descrição', key: 'descricao', sortable: false },
    { title: 'Tipo', key: 'tipo', sortable: true }
  ]

  const carregarProvas = async ({ page, itemsPerPage, sortBy }) => {
    loading.value = true
    try {
      const endpoint = role === 'professor' ? '/api/professores/turmas' : '/api/alunos/turmas'
      const response = await fetch(`${endpoint}?page=${page}&limit=${itemsPerPage}`)
      
      provas.value = []
      total.value = 0
    } catch (error) {
      console.error(`Erro ao buscar provas para ${role}:`, error)
    } finally {
      loading.value = false
    }
  }

  return { loading, provas, total, options, headers, carregarProvas }
}