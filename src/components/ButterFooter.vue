<template>
  <footer class="footer pt-120">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-10">
          <div class="footer-widget">
            <div class="logo">
              <a href="https://buttercms.com">
                <img
                  width="200"
                  src="https://cdn.buttercms.com/PBral0NQGmmFzV0uG7Q6"
                  alt="logo"
                  loading="lazy"
                />
              </a>
            </div>
            <p class="desc">
              ButterCMS is your content backend. Build better with Butter.
            </p>
            <ul class="social-links">
              <li v-for="site in socialSites" :key="site">
                <a href="#0"><i :class="['lni', `lni-${site}`]" /></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-xl-5 col-lg-4 col-md-12 col-sm-12 offset-xl-1">
          <div class="footer-widget">
            <h3>About Us</h3>
            <ul class="links">
              <li
                v-for="({ node }, index) in $static.menuItems.edges"
                :key="index"
                class="page-scroll"
              >
                <a
                  :href="`/${node.url}`"
                  :class="{ active: activeLink === node.url }"
                >
                  {{ node.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="footer-widget">
            <h3>Subscribe Newsletter</h3>
            <form action="#">
              <input type="email" placeholder="Email" />
              <button class="main-btn btn-hover">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<static-query>
query {
  menuItems: allMenuItems(sortBy: "index", order: ASC) {
    edges {
      node {
        label,
        url
      }
    }
  }
}
</static-query>

<script>
export default {
  props: ['activeLink'],
  data() {
    return {
      socialSites: ['facebook', 'linkedin', 'instagram', 'twitter'],
    }
  },
}
</script>
