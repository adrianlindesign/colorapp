class TemplatesController < ApplicationController
  def index
    t = Template.all

    respond_to do |format|
      format.json { render :json => t}
    end
  end

  def create
    binding.pry

    t = Template.create(
      screenHTML: params["screenHTML"],
      device: params["device"],
      user_id: params["user_id"]
    )
  end

end