
user goes to '/'

	//SIGN UP
	user enters details
	on.CLICK [save] {
		create new USER model
	}
	>>>>> authentication


	//LOG IN
	user enters email/username password
	
	authenticate {
		if right {
			redirect to '/index'
		else
			redirect to '/'
		}
	}
	
}

get 'index'
	//SEARCH top 100 apps
	WITH RAKE do (once per timePeriod) 
	>>>>>>>>>

	delete bottom x apps every 10 weeks from database
	server makes call to API / SCRAPES source
		if DATABASE.include? == false EACH app name {
			SAVE to database (name, img_url, link)
	}
	

	//LOADING PAGE
	page loads {

		LOAD AppModels from server


		CREATE ONE AppCollection (
			PUT appmodels in collection
			model: AppModel, 
			color = red, blue, green
			) // not yet loaded
		
		when user CLICKS [color] {
			CREATE ListView (where view.model.color == [color])
		}

		RENDER ListView //now they exist in the aether

		APPEND ListView //red now shows
	}



	//USER SORTING APPS
	// user sorts by color first
	on.CLICK [color] {
	APPEND ListView(color: [color])

		// then user sorts by genre
		on.CLICK [genre] {
		RERENDER ListView ( coelc)
	}

	//USER REQUESTS MORE APPS <<<<<<>>>>>>
	on.CLICK [search] {
		run HEX method {
			json call to app store
			create new model
			save to collection
			render view
			append
		}

	}

	//USER makes template
	view.on.CLICK and drag {
		CREATE new templates_app model
		creates NEW view
		saves to template
	}


}