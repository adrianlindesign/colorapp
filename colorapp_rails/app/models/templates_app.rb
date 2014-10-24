class Templates_app < ActiveRecord::Base
  belongs_to :app
  belongs_to :template
end