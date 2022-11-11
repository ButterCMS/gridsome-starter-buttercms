<template>
  <section class="blog-posts">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8 blog-roll-cards">
          <slot />
        </div>
        <aside class="col-12 col-lg-4">
          <blog-widget />
        </aside>
      </div>
    </div>
  </section>
</template>

<script>
import BlogWidget from '@/components/Blog/BlogWidget'

export default {
  components: { BlogWidget },
}
</script>
