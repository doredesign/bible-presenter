module RenderPartial
  def partial(page, options={})
    haml page, options.merge!(:layout => false)
  end
end

Sinatra::Application.helpers RenderPartial
