<template>
  <h2 class="section-title">Provas</h2>
  <v-card>
    <v-data-table-server 
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    item-value="name"
    @update:options="loadItems">
    </v-data-table-server>
  </v-card>
</template>

<script setup>

</script>

<style scoped></style>
