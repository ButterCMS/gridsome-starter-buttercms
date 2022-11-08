<template>
  <section :id="fields.scroll_anchor_id" class="feature-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-md-10">
          <div class="section-title mb-60">
            <h2 class="mb-20">{{ fields.headline }}</h2>
            <p>{{ fields.subheadline }}</p>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="row">
            <Feature
              v-for="(feature, index) in fields.features"
              :key="index"
              :featureData="feature"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Feature from '@/components/Feature'
export default {
  components: { Feature },
  props: ['fields'],
}
</script>
