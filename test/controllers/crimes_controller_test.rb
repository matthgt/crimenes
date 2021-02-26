require "test_helper"

class CrimesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @crime = crimes(:one)
  end

  test "should get index" do
    get crimes_url
    assert_response :success
  end

  test "should get new" do
    get new_crime_url
    assert_response :success
  end

  test "should create crime" do
    assert_difference('Crime.count') do
      post crimes_url, params: { crime: { address: @crime.address, address_reference: @crime.address_reference, category: @crime.category, description: @crime.description, happened_at: @crime.happened_at, reporter: @crime.reporter, reporter_id: @crime.reporter_id, reporter_ip: @crime.reporter_ip, reporter_user_agent: @crime.reporter_user_agent, reporter_victim_relationship_category: @crime.reporter_victim_relationship_category, title: @crime.title } }
    end

    assert_redirected_to crime_url(Crime.last)
  end

  test "should show crime" do
    get crime_url(@crime)
    assert_response :success
  end

  test "should get edit" do
    get edit_crime_url(@crime)
    assert_response :success
  end

  test "should update crime" do
    patch crime_url(@crime), params: { crime: { address: @crime.address, address_reference: @crime.address_reference, category: @crime.category, description: @crime.description, happened_at: @crime.happened_at, reporter: @crime.reporter, reporter_id: @crime.reporter_id, reporter_ip: @crime.reporter_ip, reporter_user_agent: @crime.reporter_user_agent, reporter_victim_relationship_category: @crime.reporter_victim_relationship_category, title: @crime.title } }
    assert_redirected_to crime_url(@crime)
  end

  test "should destroy crime" do
    assert_difference('Crime.count', -1) do
      delete crime_url(@crime)
    end

    assert_redirected_to crimes_url
  end
end
