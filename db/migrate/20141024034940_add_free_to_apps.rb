class AddFreeToApps < ActiveRecord::Migration
  def change
    add_column :apps, :free, :boolean
  end
end
