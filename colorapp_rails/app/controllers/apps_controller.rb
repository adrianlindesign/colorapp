
class AppsController < ApplicationController
  def index
    apps = App.all

    respond_to do |format|
      format.json { render :json => apps}
    end
  end

  def create
    app_name = params["search"]

    app_details = JSON.parse(HTTParty.get("https://itunes.apple.com/search?term=#{app_name}&country=us&entity=software"))['results'][0]



    # is free?
    is_free = "";
    if app_details['price'] == 0
      is_free = true;
    else
      is_free = false;
    end



    # colors
    app_icon_url = app_details['artworkUrl512']
    miro_colors = Miro::DominantColors.new(app_icon_url)

    hex1 = miro_colors.to_hex[0]
    hex1_percent = miro_colors.by_percentage[0] * 100
    color1 = ColorNamer.name_from_html_hash(hex1)[2]

    hex2 = miro_colors.to_hex[1]
    hex2_percent = miro_colors.by_percentage[1] * 100
    color2 = ColorNamer.name_from_html_hash(hex1)[2]


    a = App.create({
      name: app_details['artistName'],
      genre: app_details['genres'][0],
      image_url: app_icon_url,
      free: is_free,
      color1: color1,
      hex1: hex1,
      hex1_percent: hex1_percent,
      color2: color2,
      hex2: hex2,
      hex2_percent: hex2_percent,
      app_url: app_details['trackViewUrl']
    })


    respond_to do |format|
      format.json { render :json => a }
    end
  end
end

# HTTParty.post('http://localhost:3000/apps', :body => {name: "june"})
# HTTParty.post('http://localhost:3000/apps', body: {
#              :name => "Google Earth",
#             :genre => "Travel",
#         :image_url => "http://images.apple.com/autopush/us/itunes/charts/free-apps/images/2014/9/a5d308d7-ef41-80ea-923c-523ce3cb0886mzl.ogsofgoc.png",
#              :free => true,
#            :color1 => "Blue",
#              :hex1 => "#010102",
#            :color2 => "Violet",
#              :hex2 => "#070814",
#           :app_url => "https://itunes.apple.com/us/app/google-earth/id293622097?mt=8&uo=4&v0=WWW-NAUS-ITSTOP100-FREEAPPS&l=en"
#     })