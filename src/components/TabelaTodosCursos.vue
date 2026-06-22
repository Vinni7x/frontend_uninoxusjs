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
import { listarTodosCursos } from '@/services/cursoService' // ajuste o caminho conforme sua pasta

const itemsPerPage = ref(10)
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(false)

const headers = [
  { title: 'ID', key: 'idCurso', align: 'start', sortable: true },
  { title: 'Nome Curso', key: 'nomeCurso', sortable: true },
  { title: 'Carga Horária Total', key: 'cargaHorariaTotal', sortable: true },
]

// Essa função é disparada automaticamente pelo Vuetify ao mudar de página ou alterar o limite por página
const loadItems = async ({ page, itemsPerPage }) => {
  loading.value = true

  try {
    // 🔥 page - 1 para alinhar o Vuetify (1) com o Spring (0)
    const paginaSpring = page - 1

    const data = await listarTodosCursos(paginaSpring, itemsPerPage)

    console.log('Resposta da API:', data) // deixa esse log até confirmar o formato

    serverItems.value = data.content
    totalItems.value = data.totalElements

  } catch (error) {
    console.error('Erro ao buscar cursos:', error) 
  } finally {
    loading.value = false
  }
}
</script>