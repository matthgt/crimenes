class MapsController < ApplicationController
  # GET /crimes/1 or /crimes/1.json
  def show
    @location = request.location

  end
end
