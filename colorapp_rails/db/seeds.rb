# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require_relative './scrape_apps_and_parse_colors'

App.delete_all

url_paid_apps = 'http://www.apple.com/itunes/charts/paid-apps/'
url_free_apps = 'http://www.apple.com/itunes/charts/free-apps/'

free_app_details = scrape_app_details(url_free_apps, true)
paid_app_details = scrape_app_details(url_paid_apps, false)

paid_app_details.each do |hash|
  HTTParty.post('http://localhost:3000/seed.json', :body => hash)
end

free_app_details.each do |hash|
  HTTParty.post('http://localhost:3000/seed.json', :body => hash)
end

# skype
# boximize
# acorns
# wechat
# whatsapp
# Airbnb
# Flipboard
# Zite
# Betterment
# Citymapper
# Goodreader
# Notability
# Paperless
# Pin Drop
# OpenTable
# Yelp
# Feedly
# Grafio
# iThrive Journal
# Podcasts
# Tydlig
# Snupps
# Ruby%20on%20Rails
# Quip
# Quora
# Skitch
# Vevo
# Vert
# Werdz
# Wordbook
# Yummly
# Simplenote
# Mindnode
# Metapho




