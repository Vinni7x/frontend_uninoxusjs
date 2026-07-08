<template>
  
   <v-card-title class="d-flex w-100">
  <v-btn 
    class="me-auto"
    rounded="xl"
    color="primary" 
    size="small" 
    @click="adicionarCursos(item)"
  >
    + Novos Cursos 
  </v-btn>
</v-card-title> 

  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    @update:options="loadItems"
    class="tabela-estilizada rounded-xl elevation-2"
  >
    <template v-slot:item.acoes="{ item }">
      <div class="d-flex align-center ga-2">
      <v-btn 
        rounded="xl"
        color="primary" 
        size="small" 
        @click="editarCurso(item)"
      >
        Editar
      </v-btn>

      <v-btn 
        rounded="xl"
        color="red-button" 
        size="small" 
        @click="excluirCurso(item)"
      >
        Excluir
      </v-btn>
      </div>
    </template>
  </v-data-table-server>
  
</template>

<script setup>
import { ref } from 'vue'
import { listarTodosCursos } from '@/services/cursoService' 

const itemsPerPage = ref(10)
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(false)

const headers = [
  { title: 'ID', key: 'idCurso', align: 'start', sortable: true },
  { title: 'Nome Curso', key: 'nomeCurso', sortable: true },
  { title: 'Carga Horária Total', key: 'cargaHorariaTotal', sortable: true },
  { title: 'Ações', key:'acoes',sortable: false }
]


const loadItems = async ({ page, itemsPerPage }) => {
  loading.value = true

  try {
    const paginaSpring = page - 1

    const data = await listarTodosCursos(paginaSpring, itemsPerPage)

    console.log('Resposta da API:', data) 

    serverItems.value = data.content
    totalItems.value = data.totalElements

  } catch (error) {
    console.error('Erro ao buscar cursos:', error) 
  } finally {
    loading.value = false
  }
}
const editarCurso = (item) => {
  console.log('Editar:', item)
}

const excluirCurso = (item) => {
  console.log('Excluir:', item)
}
</script>
<style>
.tabela-estilizada thead th {
  background-color: #3f68cc !important;
  color: white !important;
  font-weight: bold !important;
  text-transform: uppercase !important;
}
.tabela-estilizada tbody tr:nth-child(even) td {
  background-color: #dbe4f8 !important; 
  border-bottom: none !important;
}
.tabela-estilizada tbody tr:nth-child(odd) td {
  background-color: #eef2fb !important;
  border-bottom: none !important;
}
.tabela-estilizada tbody tr:hover td {
  background-color: inherit !important;
}
</style>