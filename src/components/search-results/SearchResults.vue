<script lang="ts" src="./SearchResults.ts" />

<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-align-center">
    <h5>Loading</h5>
    <span>Please wait...</span>
  </div>

  <ul v-else-if="places.length > 0" class="list-group mt-3">
    <li
      v-for="place in places"
      :key="place.id"
      class="list-group-item list-group-item-action text-align-left"
      :class="{ active: place.id === activePlace }"
      @click="onPlaceClicked(place)"
    >
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>
      <div align="right">
        <button class="btn btn-sm" :class="place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary'">
          Go To
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
li {
  cursor: pointer;
}

h5 {
  font-size: 15px;
}

p {
  font-size: 10px;
}
</style>
