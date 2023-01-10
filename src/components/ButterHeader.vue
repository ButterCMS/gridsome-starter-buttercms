<template>
  <header class="header">
    <div class="navbar-area" ref="headerNavbar" :class="{ sticky: isSticky }">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg">
              <a class="navbar-brand" href="https://buttercms.com">
                <img src="../assets/images/butter-logo.png" alt="Logo" />
              </a>
              <button
                class="navbar-toggler"
                :class="{ active: isTogglerActive }"
                @click="toggleToggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="toggler-icon"></span>
                <span class="toggler-icon"></span>
                <span class="toggler-icon"></span>
              </button>

              <div
                :class="{ show: isTogglerActive }"
                class="collapse navbar-collapse sub-menu-bar"
                id="navbarSupportedContent"
              >
                <div class="ms-auto">
                  <ul id="nav" class="navbar-nav ms-auto">
                    <li
                      v-for="{ node } in $static.menuItems.edges"
                      :key="node.url"
                      class="nav-item"
                    >
                      <a
                        class="nav-link page-scroll"
                        :class="{ active: activeLink === `/${node.url}` }"
                        :href="`/${node.url}`"
                        :key="node.url"
                        @click="isTogglerActive = false"
                        >{{ node.label }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
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
import { ref } from 'vue'

const isSticky = ref(true)
const isTogglerActive = ref(false)

const onScroll = (headerNavbar) => {
  if (headerNavbar) {
    const stickyThreshold = headerNavbar.offsetTop
    isSticky.value = window.scrollY > stickyThreshold
  }
}
export default {
  props: ['activeLink'],
  data() {
    return {
      toggleToggler: () => {
        isTogglerActive.value = !isTogglerActive.value
      },
      isSticky,
      isTogglerActive,
    }
  },
  mounted() {
    onScroll(this.$refs.headerNavbar)
    window.document.addEventListener(
      'scroll',
      () => onScroll(this.$refs.headerNavbar),
      { passive: true }
    )
    return () => window.document.removeEventListener('scroll', onScroll)
  },
}
</script>
