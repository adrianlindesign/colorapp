class Template < ActiveRecord::Base
  belongs_to :user
  validates(:screenHTML, {presence: true} ) # gives the authenticate metho
  validates(:device, {presence: true} )
end