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
import { listarTodosProfessores } from '@/services/professorService' // ajuste o caminho conforme sua pasta

const itemsPerPage = ref(10)
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(false)

const headers = [
  { title: 'Matrícula', key: 'matriculaProfessor', align: 'start', sortable: true },
  { title: 'Nome do Professor', key: 'nomePessoa', sortable: true },
  { title: 'CPF', key: 'cpf', sortable: true },
  { title: 'Curso', key: 'nomeCurso', sortable: true },

]

// Essa função é disparada automaticamente pelo Vuetify ao mudar de página ou alterar o limite por página
const loadItems = async ({ page, itemsPerPage }) => {
  loading.value = true

  try {
    // 🔥 page - 1 para alinhar o Vuetify (1) com o Spring (0)
    const paginaSpring = page - 1

    const data = await listarTodosProfessores(paginaSpring, itemsPerPage)

    console.log('Resposta da API:', data) // deixa esse log até confirmar o formato

    serverItems.value = data.content
    totalItems.value = data.totalElements

  } catch (error) {
    console.error('Erro ao buscar professores:', error) 
  } finally {
    loading.value = false
  }
}
</script>