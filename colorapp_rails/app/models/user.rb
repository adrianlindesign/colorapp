class User < ActiveRecord::Base
  has_many :templates, dependent: :destroy
  has_secure_password
end