class Template < ActiveRecord::Base
  has_many :templates_apps, dependent: :destroy
  belongs_to :user
  validates(:screenHTML, {presence: true} ) # gives the authenticate metho
  validates(:device, {presence: true} )
end