const express = require('express')
const Feeds = require('./../models/feeds')
const router = express.Router()

router.get("/new", (req, res) => {
    res.render('feed/new', {feeds: new Feeds() })
} )

router.get('/edit/:id', async (req, res) => {
    const feeds = await Feeds.findById(req.params.id)
    res.render('feed/edit', {feeds: feeds})
} )

router.get('/:slug', async (req, res) => {
    const feeds = await Feeds.findOne({ slug: req.params.slug })
    if (feeds == null) res.redirect('/')
    res.render('feed/show', { feeds: feeds })
})

router.post("/", async (req, res, next) => {
    req.feeds = new Feeds()
    next()
    }, saveFeedsAndRedirect('new'))


router.put('/:id', async (req, res, next) => {
    req.feeds = await Feeds.findById(req.params.id)
    next()
}, saveFeedsAndRedirect('edit'))


router.delete('/:id', async (req, res) => {
    await Feeds.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })
  
  function saveFeedsAndRedirect(path) {
    return async (req, res) => {
      let feeds = req.feeds
      feeds.title = req.body.title
      feeds.description = req.body.description
      feeds.markdown = req.body.markdown
      try {
        feeds = await feeds.save()
        res.redirect(`/feed/${feeds.slug}`)
      } catch (e) {
        res.render(`feed/${path}`, { feeds : feeds })
      }
    }
  }
  
  module.exports = router