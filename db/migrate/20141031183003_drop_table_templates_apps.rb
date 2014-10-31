class DropTableTemplatesApps < ActiveRecord::Migration
  def change
    drop_table :templates_apps
  end
end
