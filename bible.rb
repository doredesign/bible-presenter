require 'uri'
require 'net/http'
require 'openssl'

class Bible
  def initialize(api_key)
    @api_key = api_key
    @kjv_bible_id = "de4e12af7f28f599-02"
    @rvr_bible_id = "592420522e16049f-01"
  end

  def list
    request("https://api.scripture.api.bible/v1/bibles")
  end

  def get_kjv
    request("https://api.scripture.api.bible/v1/bibles/#{@kjv_bible_id}")
  end

  def search(query)
    search_request(query, @kjv_bible_id)
  end

  def spanish_verse(verse_id)
    request("https://api.scripture.api.bible/v1/bibles/#{@rvr_bible_id}/verses/#{verse_id}")
  end

  def spanish_passage(passage_id)
    request("https://api.scripture.api.bible/v1/bibles/#{@rvr_bible_id}/passages/#{passage_id}",
    "content-type"   => "json",
    "include-titles" => "false")
  end

  private

  def search_request(query, bible_id)
    request("https://api.scripture.api.bible/v1/bibles/#{bible_id}/search",
      "query" => query,
      "sort"  => :relevance,
    )
  end

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
