<template>
  <v-card-title class="d-flex w-100">
  <v-btn 
    class="me-auto"
    rounded="xl"
    color="primary" 
    size="small" 
    @click="adicionarProfessores(item)"
  >
    + Novos Professores
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
      @click="editarProfessores(item)"
    >
      Editar
    </v-btn>

    <v-btn 
      rounded="xl" 
      color="red-button" 
      size="small" 
      @click="excluirProfessores(item)"
    >
      Excluir
    </v-btn>
  </div>
    </template>
  </v-data-table-server>
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
  { title: 'Ações', key: 'acoes', sortable: false, width: '260px' }

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