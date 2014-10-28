
class AppsController < ApplicationController
  def index
    apps = App.all

    respond_to do |format|
      format.json { render :json => apps}
    end
  end

  def seed
    #create app
    a = App.create({
      name: params["name"],
      genre: params["genre"],
      image_url: params["image_url"],
      free: params["free"],
      color1: params["color1"],
      hex1: params["hex1"],
      hex1_percent: params["hex1_percent"],
      color2: params["color2"],
      hex2: params["hex2"],
      hex2_percent: params["hex2_percent"],
      app_url: params["app_url"]
    })

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

    #name
    app_name_full = app_details['trackName']
    app_name = app_name_full.split("-")[0].split("–")[0].split(":")[0] #get rid of subtitles
    app_name = app_name.strip! if app_name[0] == " " || app_name[-1] == " " #trim 

    #create app
    a = App.create({
      name: app_name,
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

    #return data
    respond_to do |format|
      format.json { render :json => a }
    end

  end


end
