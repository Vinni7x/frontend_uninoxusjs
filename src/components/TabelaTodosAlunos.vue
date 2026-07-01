<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    @update:options="loadItems"
    class="tabela-estilizada rounded-xl elevation-2"
  >
    <template #[`item.rendimentoAcademico`]="{ value }">
      {{ value ? value.toFixed(2) : 'N/A' }}
    </template>

    <template v-slot:item.acoes="{ item }">
      <v-btn 
        color="primary" 
        size="small" 
        class="me-3"
        @click="editarCurso(item)"
      >
        Editar
      </v-btn>

      <v-btn 
        color="red-button" 
        size="small" 
        @click="excluirCurso(item)"
      >
        Excluir
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<script setup>
import { ref } from 'vue'
import { listarTodosAlunos } from '@/services/alunoService' 

const itemsPerPage = ref(10)
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(false)

const headers = [
  { title: 'Matrícula', key: 'matriculaAluno', align: 'start', sortable: true },
  { title: 'Nome do Aluno', key: 'nomePessoa', sortable: true },
  { title: 'Curso', key: 'nomeCurso', sortable: true },
  { title: 'Rendimento Acadêmico', key: 'rendimentoAcademico', align: 'end' },
  {title: 'Ações', Key: 'ações-btn',sortable: false}
]


const loadItems = async ({ page, itemsPerPage }) => {
  loading.value = true

  try {
   
    const paginaSpring = page - 1

    const data = await listarTodosAlunos(paginaSpring, itemsPerPage)

    console.log('Resposta da API:', data) 

    serverItems.value = data.content
    totalItems.value = data.totalElements

  } catch (error) {
    console.error('Erro ao buscar alunos:', error)
  } finally {
    loading.value = false
  }
}
</script>