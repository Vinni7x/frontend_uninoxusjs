<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    @update:options="loadItems"
  >
    <template #[`item.rendimentoAcademico`]="{ value }">
      {{ value ? value.toFixed(2) : 'N/A' }}
    </template>
  </v-data-table-server>
</template>

<script setup>
import { ref } from 'vue'
import { listarTodosAlunos } from '@/services/alunoService' // ajuste o caminho conforme sua pasta

const itemsPerPage = ref(10)
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(false)

const headers = [
  { title: 'Matrícula', key: 'matriculaAluno', align: 'start', sortable: true },
  { title: 'Nome do Aluno', key: 'nomePessoa', sortable: true },
  { title: 'Curso', key: 'nomeCurso', sortable: true },
  { title: 'Rendimento Acadêmico', key: 'rendimentoAcademico', align: 'end' },
]

// Essa função é disparada automaticamente pelo Vuetify ao mudar de página ou alterar o limite por página
const loadItems = async ({ page, itemsPerPage }) => {
  loading.value = true

  try {
    // 🔥 page - 1 para alinhar o Vuetify (1) com o Spring (0)
    const paginaSpring = page - 1

    const data = await listarTodosAlunos(paginaSpring, itemsPerPage)

    console.log('Resposta da API:', data) // deixa esse log até confirmar o formato

    serverItems.value = data.content
    totalItems.value = data.totalElements

  } catch (error) {
    console.error('Erro ao buscar alunos:', error)
  } finally {
    loading.value = false
  }
}
</script>