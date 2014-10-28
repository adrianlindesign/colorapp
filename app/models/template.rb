class Template < ActiveRecord::Base
  has_many :templates_apps, dependent: :destroy
  belongs_to :user
  validates(:screenHTML, :device {presence: true} ) # gives the authenticate metho
end