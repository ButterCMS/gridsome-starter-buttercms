<template>
  <div>
    <div class="sidebar blog-grid-page">
      <div class="widget search-widget">
        <h5 class="widget-title">Search This Site</h5>
        <form action="/blog/search" method="get">
          <input type="text" name="q" placeholder="Search Here..." />
          <button type="submit"><i class="lni lni-search-alt"></i></button>
        </form>
      </div>
    </div>

    <div class="widget categories-widget">
      <h5 class="widget-title">Categories</h5>
      <ul class="categories-list">
        <li v-for="{ node } in $static.categories.edges" :key="node.slug">
          <g-link :to="`/blog/category/${node.slug}/`">
            {{ node.name }}
          </g-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<static-query>
query {
	categories: allCategories {
    edges {
      node {
        name,
        slug
      }
    }
  }
}
</static-query>
