class ApplicationController < ActionController::Base
  before_action :set_reporter_id_cookie

  def set_reporter_id_cookie 
    return if reporter_id.present?
    cookies.signed[:rid] = SecureRandom.uuid
  end

  def reporter_id
    cookies.signed[:rid]
  end
end
