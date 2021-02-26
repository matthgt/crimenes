require "application_system_test_case"

class CrimesTest < ApplicationSystemTestCase
  setup do
    @crime = crimes(:one)
  end

  test "visiting the index" do
    visit crimes_url
    assert_selector "h1", text: "Crimes"
  end

  test "creating a Crime" do
    visit crimes_url
    click_on "New Crime"

    fill_in "Address", with: @crime.address
    fill_in "Address reference", with: @crime.address_reference
    fill_in "Category", with: @crime.category
    fill_in "Description", with: @crime.description
    fill_in "Happened at", with: @crime.happened_at
    fill_in "Reporter", with: @crime.reporter
    fill_in "Reporter", with: @crime.reporter_id
    fill_in "Reporter ip", with: @crime.reporter_ip
    fill_in "Reporter user agent", with: @crime.reporter_user_agent
    fill_in "Reporter victim relationship category", with: @crime.reporter_victim_relationship_category
    fill_in "Title", with: @crime.title
    click_on "Create Crime"

    assert_text "Crime was successfully created"
    click_on "Back"
  end

  test "updating a Crime" do
    visit crimes_url
    click_on "Edit", match: :first

    fill_in "Address", with: @crime.address
    fill_in "Address reference", with: @crime.address_reference
    fill_in "Category", with: @crime.category
    fill_in "Description", with: @crime.description
    fill_in "Happened at", with: @crime.happened_at
    fill_in "Reporter", with: @crime.reporter
    fill_in "Reporter", with: @crime.reporter_id
    fill_in "Reporter ip", with: @crime.reporter_ip
    fill_in "Reporter user agent", with: @crime.reporter_user_agent
    fill_in "Reporter victim relationship category", with: @crime.reporter_victim_relationship_category
    fill_in "Title", with: @crime.title
    click_on "Update Crime"

    assert_text "Crime was successfully updated"
    click_on "Back"
  end

  test "destroying a Crime" do
    visit crimes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Crime was successfully destroyed"
  end
end
