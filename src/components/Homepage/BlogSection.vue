<template>
  <section id="blog" class="blog-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-10">
          <div class="section-title text-center">
            <h2>Latest Blog Posts</h2>
            <p>
              Butter also has a built in blog engine which makes it dead simple
              to launch a new company blog.
            </p>
            <p>
              <router-link class="main-btn btn-hover mt-5" to="/blog/">
                View All Blog Posts
              </router-link>
            </p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <blog-post-tile
          v-for="({ node }, index) in $static.blogPosts.edges"
          :key="index"
          v-bind="node"
        />
      </div>
    </div>
  </section>
</template>

<static-query>
query {
	blogPosts: allBlogPosts(perPage: 2, page: 1, order: ASC) {
    edges {
      node {
        title,
        slug,
        summary,
        featured_image_alt,
        featured_image,
      }
    }
  }
}
</static-query>

<script>
import BlogPostTile from '@/components/BlogPostTile'
export default {
  components: { BlogPostTile },
}
</script>
