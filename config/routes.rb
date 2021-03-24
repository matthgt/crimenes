Rails.application.routes.draw do
  root to: 'maps#show'
  resource :map, only: :show
  resources :crimes, only: [:new, :show, :index, :create]
  
  namespace :help do
    get :categorias
    get :sobre_nosotros 
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
