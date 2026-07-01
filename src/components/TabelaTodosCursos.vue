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
/* Atenção: A tag acima está sem o "scoped" de propósito! */

/* 1. Estilizando o cabeçalho (Fundo azul escuro e texto branco) */
.tabela-estilizada thead th {
  background-color: #3f68cc !important;
  color: white !important;
  font-weight: bold !important;
  text-transform: uppercase !important;
}

/* 2. Linhas Pares (Azul clarinho) */
.tabela-estilizada tbody tr:nth-child(even) td {
  background-color: #dbe4f8 !important; 
  border-bottom: none !important;
}

/* 3. Linhas Ímpares (Fundo mais branco) */
.tabela-estilizada tbody tr:nth-child(odd) td {
  background-color: #eef2fb !important;
  border-bottom: none !important;
}

/* 4. Remove o efeito cinza de hover do Vuetify ao passar o mouse */
.tabela-estilizada tbody tr:hover td {
  background-color: inherit !important;
}
</style>