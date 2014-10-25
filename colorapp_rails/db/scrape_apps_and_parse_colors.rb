require_relative './miro_query' #rgb(app_name) hex(app_name) #color_percents(app_name)
require 'pry'
require 'miro'
require 'httparty'
require 'nokogiri'


# require_relative './sort_rgb' #color_sort(ary)
require 'color_namer'

url_paid_apps = 'http://www.apple.com/itunes/charts/paid-apps/'
url_free_apps = 'http://www.apple.com/itunes/charts/free-apps/'

def scrape_app_details(url, price_is_free)
  app_details = []
  url = Nokogiri::HTML(HTTParty.get(url))

  app_links = url.css('div.section-content li')

  app_links.each do |l|
    hash = {
      name: "",
      genre: "",
      image_url: "",
      free: price_is_free,
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

    # extract color ---------------------------------
    miro_colors = Miro::DominantColors.new(hash[:image_url])
    colors_array = miro_colors.to_hex
    
    if colors_array[0]
      hash[:hex1] = colors_array[0]

      color1_details_array = ColorNamer.name_from_html_hash(hash[:hex1])
      hash[:color1] = color1_details_array[2]
    else 
      hash[:hex1] = '#000000'
      hash[:color1] = "other"
    end

    if colors_array[1]
      hash[:hex2] = colors_array[1]

      color2_details_array = ColorNamer.name_from_html_hash(hash[:hex2])
      hash[:color2] = color2_details_array[2]
    else 
      hash[:hex2] = '#000000'
      hash[:color2] = "other"
    end
    
    app_details << hash
    puts app_details
  end
  return app_details
end
# free_app_details = scrape_app_details(url_free_apps)
# paid_app_details = scrape_app_details(url_paid_apps)
# binding.pry
