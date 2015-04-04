desc 'Run the app'
task :s do
  system "bundle exec rackup -p 4567"
end
