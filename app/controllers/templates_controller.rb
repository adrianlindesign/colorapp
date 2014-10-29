class TemplatesController < ApplicationController
  def index
    t = Template.all

    respond_to do |format|
      format.json { render :json => t}
    end
  end

  def create

    t = Template.create(
      screenHTML: params["screenHTML"],
      device: params["device"],
      user_id: params["user_id"],
      name: params["template_name"]
    )
  end

  def show
    t = Template.find(params[:id]);

    respond_to do |format|
      format.json { render :json => t}
    end
  end

  def destroy

    t = Template.find(params[:id])
    t.destroy

  end

end
