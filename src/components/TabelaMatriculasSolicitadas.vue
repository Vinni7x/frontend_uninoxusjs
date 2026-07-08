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
    <template v-slot:item.acoes="{ item }">
  <div class="d-flex align-center ga-2">
    <v-btn 
      rounded="xl" 
      color="primary" 
      size="small"
      @click="aceitarAluno(item)"
    >
      Aceitar
    </v-btn>

    <v-btn 
      rounded="xl" 
      color="red-button" 
      size="small" 
      @click="recusarAluno(item)"
    >
      Recusar
    </v-btn>
  </div>
    </template>
  </v-data-table-server>
</template>

<script setup>
import { ref } from 'vue'
import { fetchMatriculasPendentes } from '@/services/alunoService' 

const itemsPerPage = ref(10)
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(false)

const headers = [
  { title: 'ID', key: 'matriculaAluno', align: 'start', sortable: true },
  { title: 'Aluno', key: 'nomePessoa', sortable: true },
  { title: 'Ações', key:'acoes',sortable: false }
]


const loadItems = async ({idTurma, page, itemsPerPage }) => {
  loading.value = true

  try {
    const paginaSpring = page - 1

    const data = await fetchMatriculasPendentes(idTurma, paginaSpring, itemsPerPage)

    console.log('Resposta da API:', data) 

    serverItems.value = data.content
    totalItems.value = data.totalElements

  } catch (error) {
    console.error('Erro ao buscar alunos:', error) 
  } finally {
    loading.value = false
  }
}
const aceitarAluno = (item) => {
  console.log('Aceitar:', item)
}

const recusarAluno = (item) => {
  console.log('Recusar:', item)
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