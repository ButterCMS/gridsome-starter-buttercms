<template>
  <section id="home" class="hero-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-xl-6 col-lg-6 col-md-10">
          <div class="hero-content">
            <h1>Incorrect Token</h1>
            <p>Check that your ButterCMS API token is correct.</p>
          </div>
        </div>
        <div class="col-xxl-6 col-xl-6 col-lg-6">
          <img width="300" src="../assets/images/cog.png" alt="" />
          <div class="hero-image text-center text-lg-end"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line no-console
    console.error(
      'Your Butter token might be set to an invalid value. Please verify your token is correct.'
    )
  },
}
</script>
