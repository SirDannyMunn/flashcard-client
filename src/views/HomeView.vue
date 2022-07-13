<template>
  <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
    <!-- Right column -->
    <div class="grid grid-cols-1 gap-4">
      <section aria-labelledby="section-2-title">
        <h2 class="sr-only" id="section-2-title">Section title</h2>
        <div class="rounded-lg bg-white overflow-hidden">
          <HighlightsContainer/>
        </div>
      </section>
    </div>

    <!-- Left column -->
    <div class="grid grid-cols-1 gap-4 lg:col-span-2">
      <section aria-labelledby="section-1-title">
        <h2 class="sr-only" id="section-1-title">Section title</h2>
        <div class="rounded-lg bg-white overflow-hidden">
          <div class="p-6">
            <Player/>
          </div>
        </div>
        <SliderWidget></SliderWidget>
        <Transcript></Transcript>
      </section>
    </div>
  </div>
</template>

<script setup>

import Player from "@/components/Player";
import Transcript from "@/components/Transcript";
import HighlightsContainer from "@/components/Highlight/HighlightsContainer";</script>
