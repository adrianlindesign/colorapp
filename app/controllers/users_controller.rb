class UsersController < ApplicationController
  
  def create
    new_user = User.create(
      username: params["username"],
      email: params["email"],
      password: params["password"] # HAS TO BE password, not password_digest
    )

    redirect_to '/'
  end

  def index
    users = User.all
    respond_to do |format|
      format.json { render :json => users}
    end
  end

  def show
    user = User.find(params[:id])

    respond_to do |format|
      format.json { render :json => user}
    end
  end

  def new
    render :signup
  end
end