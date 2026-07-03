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
      <v-btn 
        color="primary" 
        size="small" 
        class="me-3"
        @click="editarTurma(item)"
      >
        Editar
      </v-btn>

      <v-btn 
        color="red-button" 
        size="small" 
        @click="excluirTurma(item)"
      >
        Excluir
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<script setup>
import { ref } from 'vue'
import { listarTodasTurmas } from '@/services/turmaService' 

const itemsPerPage = ref(10)
const serverItems = ref([])
const totalItems = ref(0)
const loading = ref(false)

const headers = [
  { title: 'Id', key: 'idTurma', align: 'start', sortable: true },
  { title: 'Disciplina', key: 'nomeDisicplina', sortable: true },
  { title: 'Professor', key: 'nomeProfessor', sortable: true },
  { title: 'Local', key: 'local', sortable: true },
  { title: 'Horário', key: 'horario', sortable: false },
  { title: 'Vagas', key: 'vagas', sortable: true },
  { title: 'Status', key: 'statusTurma', sortable: true },
  { title: 'Ações', Key: 'acoes',sortable: false} 
]


const loadItems = async ({ page, itemsPerPage }) => {
  loading.value = true

  try {
   
    const paginaSpring = page - 1

    const data = await listarTodasTurmas(paginaSpring, itemsPerPage)

    console.log('Resposta da API:', data) 

    serverItems.value = data.content
    totalItems.value = data.totalElements

  } catch (error) {
    console.error('Erro ao buscar turmas:', error)
  } finally {
    loading.value = false
  }
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