class AppsController < ApplicationController
  def index
    render(:index)
  end

  def create
    a = App.create({
      name: params["name"],
      genre: params["genre"],
      image_url: params["image_url"],
      free: params["free"],
      color1: params["color1"],
      hex1: params["hex1"],
      color2: params["color2"],
      hex2: params["hex2"],
      app_url: params["app_url"]
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