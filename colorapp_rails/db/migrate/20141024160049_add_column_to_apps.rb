class AddColumnToApps < ActiveRecord::Migration
  def change
    add_column :apps, :r, :integer
    add_column :apps, :g, :integer
    add_column :apps, :b, :integer
  end
end
