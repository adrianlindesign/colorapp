# require 'pry'
# require 'nokogiri'
# require 'httparty'



# itunes charts - free apps 
# http://www.apple.com/itunes/charts/free-apps/
def scrape_free_item_details()
  free_item_details = []
  url = Nokogiri::HTML(HTTParty.get('http://www.apple.com/itunes/charts/free-apps/'))

  free_item_links = url.css('div.section-content li')

  free_item_links.each do |l|
    hash = {
      name: "",
      genre: "",
      image_url: "",
      free: true,
      color1: "",
      hex1: "",
      color2: "",
      hex2: "",
      app_url: ""
    }

    hash[:name] = l.at_css('h3').content
    hash[:genre] = l.at_css('h4').content
    hash[:image_url] = l.at_css('a img')['src']
    hash[:app_url] = l.at_css('a')['href']  

    free_item_details << hash
  end
  return free_item_details
end


# itunes charts - free apps 
# http://www.apple.com/itunes/charts/paid-apps/

def scrape_paid_item_details()
  paid_item_details = []
  url = Nokogiri::HTML(HTTParty.get('http://www.apple.com/itunes/charts/paid-apps/'))

  paid_item_links = url.css('div.section-content li')

  paid_item_links.each do |l|
    hash = {
      name: "",
      genre: "",
      image_url: "",
      free: false,
      color1: "",
      hex1: "",
      color2: "",
      hex2: "",
      app_url: ""
    }
    
    hash[:name] = l.at_css('h3').content
    hash[:genre] = l.at_css('h4').content
    hash[:image_url] = l.at_css('a img')['src']
    hash[:app_url] = l.at_css('a')['href']

    paid_item_details << hash
  end
  return paid_item_details
end

# binding.pry



