class AddLatLongToCrimes < ActiveRecord::Migration[6.1]
  def change
    add_column :crimes, :lat, :decimal, precision: 8, scale: 6
    add_column :crimes, :long, :decimal, precision: 9, scale: 6
  end
end
