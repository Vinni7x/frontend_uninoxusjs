<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    @update:options="loadItems"
  ></v-data-table-server>
</template>

<script setup>
import { ref } from 'vue'
import { listarTodosProfessores } from '@/services/professorService' 

const itemsPerPage = ref(10)
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(false)

const headers = [
  { title: 'Matrícula', key: 'matriculaProfessor', align: 'start', sortable: true },
  { title: 'Nome do Professor', key: 'nomePessoa', sortable: true },
  { title: 'CPF', key: 'cpf', sortable: true },
  { title: 'Curso', key: 'nomeCurso', sortable: true },
  {title: 'Ações', Key: 'ações-btn',sortable: false }

]


const loadItems = async ({ page, itemsPerPage }) => {
  loading.value = true

  try {
   
    const paginaSpring = page - 1

    const data = await listarTodosProfessores(paginaSpring, itemsPerPage)

    console.log('Resposta da API:', data) 

    serverItems.value = data.content
    totalItems.value = data.totalElements

  } catch (error) {
    console.error('Erro ao buscar professores:', error) 
  } finally {
    loading.value = false
  }
}
</script>