class AddHex1PercentAndHex2PercentToApps < ActiveRecord::Migration
  def change 
    add_column :apps, :hex1_percent, :integer
    add_column :apps, :hex2_percent, :integer
  end
end
