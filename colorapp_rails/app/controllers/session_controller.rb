class SessionController < ApplicationController


  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to "/users/#{user.id}"
    else
      @error = true
      render :new
    end
  end

  def destroy
    reset_session
    redirect_to '/' #change to apps later
  end


end