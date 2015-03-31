require 'rubygems'
require 'sinatra/base'
require 'haml'

class SinatraBootstrap < Sinatra::Base
  require './helpers/render_partial'

  get '/' do
    haml :index
  end

  get '/search/:query' do
    %Q[{"result":"You searched for #{params[:query]}"}]
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
