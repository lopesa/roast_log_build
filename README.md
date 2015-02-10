This is my project of building a basic MEAN stack app. This is a roaster log app, but really I'm just getting used to the core functionality of all the parts of the stack. I'm learning to roast coffee and that has data, so I'm making a coffee roasting app to learn both.


####install node dependencies

	npm install

####basic ruby setup (for Compass and Susy) ignore if you have already
	update ruby
	gem update --system

install the ruby package manager "bundler"

	sudo gem install bundle

####install ruby dependencies from config.rb file
	bundle install

####watch for changes to to scss files to signal new rewrites to css files
css files are inlcuded so feel free to just use them, although they may be out of date
	
	compass watch

####install vendor dependencies
	bower install
	
####start server
	grunt nodemon

##TO DO

* image zoomer  

* user login

* validation on image upload

* graph of roast temp

* all of the details of the image upload. Deleting the image on deleting a roast.
