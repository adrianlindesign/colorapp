require_relative './miro' #rgb(app_name) hex(app_name) #color_percents(app_name)
require 'pry'
require 'miro'
require 'httparty'
require 'nokogiri'


# require_relative './sort_rgb' #color_sort(ary)
require 'color_namer'


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

      color2_details_array = ColorNamer.name_from_html_hash(hash[:hex1])
      hash[:color1] = color2_details_array[2]
    else 
      hash[:hex1] = '#000000'
      hash[:color1] = "other"
    end
    
    hash[:hex2] = colors_array[1] if colors_array[1]


    free_item_details << hash
    puts free_item_details
  end
  return free_item_details
end
# a = scrape_free_item_details()
# binding.pry


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
    
    

    paid_item_details << hash
    puts paid_item_details
  end
  return paid_item_details
end

a = scrape_paid_item_details()
binding.pry



