if (!module) var module = {}
module.exports = {
    pages: [
        "Home",
        "Skills",
        "Experience",
        "Demos",
        "Blog"
    ],
    
    page_text: {
        home: {
            title: "Jacob Friesen - Web Developer",
            introduction: "Hello, I'm Jacob Friesen a Computer Science Honours Co-op student from the University of Manitoba. \
                           Currently I'm in a work term. I specialize in scripting languages and web development."
        },
        
        skills: {
            title: "Skills - Jacob Friesen"
        },
        
        experience: {
            title: "Experience - Jacob Friesen",
            jobs: [
                {
                    position: "Web Developer",
                    company: "Iders",
                    date: "August 2011 - December 2011",
                    details: [
                        "Added a new Inventory Location Management system to the current Imformation Management System. This new \
                        system includes 5 different sections which all had different hardware and software environments.",
                        "Used ExtJS, AJAX and some HTML/CSS to design the front end interfaces.",
                        "The rest of the backend code was coded mainly in Python with some Javascript (Titanium Studio Libraries) and ZPL.",
                        "Additionally improved system perfomance in general by a factor of 2 and added a way to save all window placement \
                        state between sessions. (See the demo description)"
                    ]
                },
                {
                    position: "Web Developer",
                    company: "AAFC",
                    date: "January 2011 - April 2011",
                    details: [
                        "Redesigned and managed the back end (server side) of all the Rural Water Resources Planner website's tools \
                        using Java.",
                        "Redesigned and managed the front end (client side) of the website using a mix of JSF, HTML/CSS, and Javascript. \
                        Client side development mainly involved designing graphical user interfaces for the website's tools.",
                        "Participated in defining user experience, page designs, software architecture and other web application essentials \
                        for the whole website."
                    ]
                },
                {
                    position: "Crew Member",
                    company: "Wendy's",
                    date: "May 2010 - August 2010"
                },
                {
                    position: "Landscaper",
                    company: "Little Bud's Tree Farm",
                    date: "June 2009 - August 2009"
                },
            ]
        },
        
        demos: {
            title: "Demos - Jacob Friesen"
        }
    }
}
var constant = module.exports;// make it easy to access client side