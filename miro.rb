require 'pry'
require 'miro'
require 'httparty'

# http://www.colorschemer.com/online.html #testing

def hex(app_name)
  url= JSON.parse(HTTParty.get("https://itunes.apple.com/search?term=#{app_name}&country=us&entity=software"))['results'][0]['artworkUrl60']

  colors = Miro::DominantColors.new(url)

  app_colors_hex = colors.to_hex
  app_color_rgb = colors.to_rgb
  app_color_percentages = colors.by_percentage


  return app_colors_hex # returns hex array

  app_colors_hex[0].split('#')[1]
  # returns hex_code_array's first color, i believe it's the dominant first
end


binding.pry

#first colours
dropbox = "edf1f4" #super light grey / white
yelp = 'b00401' # dark red
mindnode = 'fefefe' # white
evernote = '161616' #green
skitch = 'aa0b3d' # dark pink
facebook = '09164a' #dark blue
wechat = '009e01' #green
kakaotalk = 'fbcc06' #yellow
