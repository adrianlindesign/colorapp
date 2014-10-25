class UsersController < ApplicationController
  def create
    new_user = User.create(
      username: params["username"],
      email: params["email"],
      password: params["password"] # HAS TO BE password, not password_digest
    )

    redirect_to '/'
  end

  def show
    user = User.find(params[:id])
    render(:show, locals: {user: user})
  end
end