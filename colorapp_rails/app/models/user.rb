class User < ActiveRecord::Base
  validates(:password, :email, {presence: true} ) # gives the authenticate method
  validates(:email, :username, {uniqueness: true} )

  has_many :templates, dependent: :destroy
  has_secure_password
end