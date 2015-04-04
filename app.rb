require 'sinatra/base'

class SinatraBootstrap < Sinatra::Base
  require './helpers/render_partial'

  get '/' do
    haml :index
  end

  get '/search/:query' do
    biblesearch = BibleSearch.new('CTvFYwXbINxqeO2eMGKSTqDqnnykcE7zGyGIqoZX')
    result = biblesearch.search(params[:query], {version:'eng-KJV'})
    JSON.generate result
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
