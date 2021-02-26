# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_26_185654) do

  create_table "crimes", force: :cascade do |t|
    t.string "category"
    t.string "title"
    t.text "description"
    t.datetime "happened_at"
    t.string "address"
    t.string "address_reference"
    t.string "reporter_ip"
    t.string "reporter_user_agent"
    t.string "reporter_id"
    t.string "reporter_victim_relationship_category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "lat", precision: 8, scale: 6
    t.decimal "long", precision: 9, scale: 6
  end

end
