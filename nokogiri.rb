require 'pry'
require 'nokogiri'
require 'httparty'



# itunes charts - free apps 
# http://www.apple.com/itunes/charts/free-apps/

free_item_details = []
url = Nokogiri::HTML(HTTParty.get('http://www.apple.com/itunes/charts/free-apps/'))

free_item_links = url.css('div.section-content li')

free_item_links.each do |l|
  hash = {
    name: "",
    genre: "",
    url: "",
    image_url: ""
  }

  hash[:name] = l.at_css('h3').content
  hash[:genre] = l.at_css('h4').content
  hash[:url] = l.at_css('a')['href']
  hash[:image_url] = l.at_css('a img')['src']
  
  free_item_details << hash
end


# itunes charts - free apps 
# http://www.apple.com/itunes/charts/paid-apps/

paid_item_details = []
url = Nokogiri::HTML(HTTParty.get('http://www.apple.com/itunes/charts/paid-apps/'))

paid_item_links = url.css('div.section-content li')

paid_item_links.each do |l|
  hash = {
    name: "",
    genre: "",
    url: "",
    image_url: ""
  }
  
  hash[:name] = l.at_css('h3').content
  hash[:genre] = l.at_css('h4').content
  hash[:url] = l.at_css('a')['href']
  hash[:image_url] = l.at_css('a img')['src']

  paid_item_details << hash
end

binding.pry



