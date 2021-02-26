class CreateCrimes < ActiveRecord::Migration[6.1]
  def change
    create_table :crimes do |t|
      t.string :category
      t.string :title
      t.text :description
      t.datetime :happened_at
      t.string :address
      t.string :address_reference
      t.string :reporter_ip
      t.string :reporter_user_agent
      t.string :reporter_id
      t.string :reporter_victim_relationship_category

      t.timestamps
    end
  end
end
