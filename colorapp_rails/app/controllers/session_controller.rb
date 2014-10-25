class SessionController < ApplicationController
  def new
    if session[:user_id]
      redirect_to '/'
    else
      render(:new)
    end
  end

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
    redirect_to '/login' #change to apps later
  end


end