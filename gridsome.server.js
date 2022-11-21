// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const Butter = require('buttercms')
const { isArray } = require('util')
let butterCMS = undefined

try {
  const apiKey = process.env.GRIDSOME_APP_BUTTER_CMS_API_KEY
  const preview = process.env.GRIDSOME_APP_BUTTER_CMS_PREVIEW !== 'false'
  butterCMS = Butter(apiKey, preview)
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Error while getting Butter CMS:', error)
}

function createCollection(addCollection, typeName, data) {
  if (!data) {
    return
  }

  const collection = addCollection({
    typeName: typeName,
  })

  if (isArray(data)) {
    data.forEach((value) => {
      collection.addNode(value)
    })
    return
  }

  collection.addNode(data)
}

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    if (!butterCMS) {
      // Unfortunately there's no dynamic way to create GraphQL queries, so we have to load some empty data
      createCollection(addCollection, 'Error', { errorType: 'NO_API_TOKEN' })
      createCollection(addCollection, 'MenuItems', {
        label: '',
        url: '',
        index: 0,
      })
      createCollection(addCollection, 'HomePageData', {
        fields: {
          seo: {
            title: '',
            description: '',
          },
          body: {
            type: '',
            fields: {
              headline: '',
              subheadline: '',
              image: '',
              button_label: '',
              button_url: '',
              scroll_anchor_id: '',
              image_position: '',
              features: {
                headline: '',
                description: '',
                icon: '',
              },
              testimonial: {
                quote: '',
                name: '',
                title: '',
              },
            },
          },
        },
      })
      createCollection(addCollection, 'BlogPosts', {
        title: '',
        slug: '',
        summary: '',
        featured_image_alt: '',
        featured_image: '',
      })
      createCollection(addCollection, 'Categories', { name: '', slug: '' })
      return
    }

    const errorCollection = addCollection({
      typeName: 'Error',
    })

    await butterCMS.content
      .retrieve(['navigation_menu'])
      .then((res) => {
        const data = res.data?.data?.navigation_menu[0]?.menu_items?.map(
          (item, index) => {
            return {
              index,
              ...item,
            }
          }
        )
        createCollection(addCollection, 'MenuItems', data)
      })
      .catch((e) => errorCollection.addNode(e))

    await butterCMS.page
      .retrieve('landing-page', 'landing-page-with-components')
      .then((res) => {
        createCollection(addCollection, 'HomePageData', res.data.data)
      })
      .catch((e) => errorCollection.addNode(e))

    await butterCMS.post
      .list()
      .then((res) => {
        const data = res.data?.data?.map((blog) => {
          // We need to do this because GraphQL won't create the field featured_image if it's null and therefor we can't query it
          if (!blog.featured_image) {
            blog.featured_image = ''
          }

          return blog
        })
        createCollection(addCollection, 'BlogPosts', data)
      })
      .catch((e) => errorCollection.addNode(e))

    await butterCMS.category
      .list()
      .then((res) => {
        createCollection(addCollection, 'Categories', res?.data?.data)
      })
      .catch((e) => errorCollection.addNode(e))
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
