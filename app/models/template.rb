class Template < ActiveRecord::Base
  has_many :templates_apps, dependent: :destroy
  belongs_to :user
end