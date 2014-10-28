Rails.application.routes.draw do
  
  resources :apps
  resources :users do
    resources :templates, shallow: true
  end

  root 'home#index'

  post '/login' => 'session#create'
  delete '/session' => 'session#destroy'

  post '/seed' => 'apps#seed'




#  Prefix Verb   URI Pattern                             Controller#Action
#              apps GET    /apps(.:format)                         apps#index
#                   POST   /apps(.:format)                         apps#create
#           new_app GET    /apps/new(.:format)                     apps#new
#          edit_app GET    /apps/:id/edit(.:format)                apps#edit
#               app GET    /apps/:id(.:format)                     apps#show
#                   PATCH  /apps/:id(.:format)                     apps#update
#                   PUT    /apps/:id(.:format)                     apps#update
#                   DELETE /apps/:id(.:format)                     apps#destroy
#    user_templates GET    /users/:user_id/templates(.:format)     templates#index
#                   POST   /users/:user_id/templates(.:format)     templates#create
# new_user_template GET    /users/:user_id/templates/new(.:format) templates#new
#     edit_template GET    /templates/:id/edit(.:format)           templates#edit
#          template GET    /templates/:id(.:format)                templates#show
#                   PATCH  /templates/:id(.:format)                templates#update
#                   PUT    /templates/:id(.:format)                templates#update
#                   DELETE /templates/:id(.:format)                templates#destroy
#             users GET    /users(.:format)                        users#index
#                   POST   /users(.:format)                        users#create
#          new_user GET    /users/new(.:format)                    users#new
#         edit_user GET    /users/:id/edit(.:format)               users#edit
#              user GET    /users/:id(.:format)                    users#show
#                   PATCH  /users/:id(.:format)                    users#update
#                   PUT    /users/:id(.:format)                    users#update
#                   DELETE /users/:id(.:format)                    users#destroy
























  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
