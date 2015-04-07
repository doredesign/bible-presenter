require 'sinatra/base'

class SinatraBootstrap < Sinatra::Base
  require './helpers/render_partial'

  get '/' do
    haml :index
  end

  get '/client' do
    @additional_css = [
      {:href=>'/stylesheets/reveal.css', :media => "screen", :rel => 'stylesheet', :type => "text/css"},
      {:href=>'/stylesheets/theme/white.css', :rel => 'stylesheet', :id => "theme"}
    ]
    @additional_js = [
      "/javascripts/reveal.js"
    ]
    haml :client
  end

  get '/search/:query' do
    biblesearch = BibleSearch.new('CTvFYwXbINxqeO2eMGKSTqDqnnykcE7zGyGIqoZX')
    result = biblesearch.search(params[:query], {version:'eng-KJV'})
    JSON.generate result
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
