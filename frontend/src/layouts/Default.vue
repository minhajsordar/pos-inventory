<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <div>
          <q-btn to="/">Home</q-btn>
          <q-btn to="/login">Login</q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup></script>
<style>
.q-item .q-item__section--avatar {
  min-width: 32px;
  padding-right: 0px;
}
</style>
