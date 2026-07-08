<template>
  <v-app>
    <v-main>
      <HeaderAdmin/>

      <v-toolbar extended>
        <template v-slot:extension>
          <v-tabs v-model="tab">
            <v-tab value="turmas" text="Turmas"></v-tab>
            <v-tab value="cursos" text="Cursos"></v-tab>
            <v-tab value="alunos" text="Alunos"></v-tab>
            <v-tab value="disciplinas" text="Disciplina"></v-tab>
            <v-tab value="professores" text="Professores"></v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-container fluid>
        <v-tabs-window v-model="tab">
          
          <v-tabs-window-item value="turmas">
            <TabelaTodasTurmas />
          </v-tabs-window-item>

          <v-tabs-window-item value="cursos">
            <TabelaTodosCursos />
          </v-tabs-window-item>

          <v-tabs-window-item value="alunos">
            <TabelaTodosAlunos />
          </v-tabs-window-item>

          <v-tabs-window-item value="disciplinas">
            <TabelaTodasDisciplinas />
          </v-tabs-window-item>

          <v-tabs-window-item value="professores">
            <TabelaTodosProfessores />
          </v-tabs-window-item>

        </v-tabs-window>
      </v-container>

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderAdmin from './components/HeaderAdmin.vue';
import TabelaTodasTurmas from './components/TabelaTodasTurmas.vue';
import TabelaTodosCursos from './components/TabelaTodosCursos.vue';
import TabelaTodosAlunos from './components/TabelaTodosAlunos.vue';
import TabelaTodasDisciplinas from './components/TabelaTodasDisciplinas.vue';
import TabelaTodosProfessores from './components/TabelaTodosProfessores.vue';


const tab = ref('turmas');

</script>