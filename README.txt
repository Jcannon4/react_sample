Hi There!

This is the presentation folder! 
I'm here to guide you through this sample code, so lets get started!
This code does not compile or run with the node run commands, it simply just
demonstrates my coding style and practices.

Assets
    Contains two pngs just forshow, nothing special. comBadge will be imported
    elsewhere in this sample project

node_modules
    Just a placeholder, seemed right to fit it into this sample repo.

src
    Contains sample code and likely what you want to look at, I will provide a 
    helpful overhead view on what to look at and what order

    START:
        screen/rightnow/index.js file ---> Here are some important objects and functions in this file
        useEffect() --> fires at beginning of screen render
        formData --> stores data from our textInput object
        renderItem() --> describes what our postcard object should do and look like
        postcard --> imported from components and displays information
        checkschool() --> checks that a user has given us a school (important for app but not really here)

        TURN YOUR ATTENTION TO :
            LINE 20 we import our doGoAddPost function from our redux folder...
            LINE 167, you should see, goAddPost: (formData, uid) => dispatch(doGoAddPost(formData, uid)), 
            This is where we connect LINE 20 to LINE 156
            LINE 156, brings in the proptype so it fires properly on LINE 123,
            LINE 123, you should be looking at onPress={() => goAddPost(formData, uid)}
            This function, is embedded in a clickable image that creates and sends our ficitonal post,

    NEXT : 
        redux/actions/Rightnow
        This is where we export functions to screens. This file serves as a middleman for our
        reducer (so we can update state) and function (we can perform action).
        WE need to fill this payload object so we will proceed to the api folder to add the post,
        and give our reducer some data.
    
    NEXT :
        api/Rightnow.js
        We query the database for our users information (despite not using it) then we send a post using cometchat,
        Dont worry about variable like receiverID, messageText, or receiverType. These are API specific vars.
        Note LINE 30 we return the message object to our payload, which goes to our reducer.

    FINALLY:
        redux/reducers/Rightnow
        Our frontend has called the action, our api file completed the action, and in this file we 
        update the application with the data from our action. 

I hope this will give you a feel for the code structure, the presentation will run through this smoothly
and show the reducers.

BONUS: 
    src/component/postcard.js
    This object is returned within the RenderItem function for our FlatList. It is mainly UI/UX.


