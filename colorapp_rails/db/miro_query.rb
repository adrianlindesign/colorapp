# require 'pry'
# require 'miro'
# require 'httparty'

# this method makes an API call, then parses

# http://www.colorschemer.com/online.html #testing.

def rgb(app_name)
  url= JSON.parse(HTTParty.get("https://itunes.apple.com/search?term=#{app_name}&country=us&entity=software"))['results'][0]['artworkUrl60']
  colors = Miro::DominantColors.new(url)
  return colors.to_rgb  # returns dominant rgb color
end


def hex(app_name)
  url= JSON.parse(HTTParty.get("https://itunes.apple.com/search?term=#{app_name}&country=us&entity=software"))['results'][0]['artworkUrl60']
  colors = Miro::DominantColors.new(url)
  return colors.to_hex # returns dominant hex color
end

def color_percents(app_name)
  url= JSON.parse(HTTParty.get("https://itunes.apple.com/search?term=#{app_name}&country=us&entity=software"))['results'][0]['artworkUrl60']
  colors = Miro::DominantColors.new(url)
  return colors.by_percentage # returns percentages of colours used
end

# binding.pry

#first colours
dropbox = "edf1f4" #super light grey / white
yelp = 'b00401' # dark red
mindnode = 'fefefe' # white
evernote = '161616' #green
skitch = 'aa0b3d' # dark pink
facebook = '09164a' #dark blue
wechat = '009e01' #green
kakaotalk = 'fbcc06' #yellow
