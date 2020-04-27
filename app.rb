require 'sinatra/base'

class SinatraBootstrap < Sinatra::Base
  require './helpers/render_partial'
  require './bible'

  get '/' do
    haml :index
  end

  get '/client' do
    @additional_css = [
      {:href=>'/stylesheets/reveal.css', :media => "screen", :rel => 'stylesheet', :type => "text/css"},
      {:href=>'/stylesheets/theme/white.css', :rel => 'stylesheet', :id => "theme", :type => "text/css"}
    ]
    @additional_js = [
      "/javascripts/reveal.js"
    ]
    haml :client
  end

  get '/search/:query' do
    bible = Bible.new(ENV["API_KEY"])
    result = bible.search(params[:query])
    JSON.generate result
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
