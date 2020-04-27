require 'uri'
require 'net/http'
require 'openssl'

class Bible
  def initialize(api_key)
    @api_key = api_key
    @kjv_bible_id = "de4e12af7f28f599-02"
  end

  def list
    request("https://api.scripture.api.bible/v1/bibles")
  end

  def get_kjv
    request("https://api.scripture.api.bible/v1/bibles/#{@kjv_bible_id}")
  end

  def search(query)
    request("https://api.scripture.api.bible/v1/bibles/#{@kjv_bible_id}/search",
      "query" => query,
      "sort"  => :relevance,
    )
  end

  private

  def request(url, params = {})
    uri = URI(url)
    uri.query = URI.encode_www_form(params)

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(uri)
    request["accept"] = '*/*'
    request["api-key"] = @api_key

    response = http.request(request)
    JSON.parse(response.read_body)
  end
end
