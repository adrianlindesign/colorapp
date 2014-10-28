class HomeController < ApplicationController
  def index
    templates = Template.all
    render :index, {locals: {templates: templates}}
  end

  
end