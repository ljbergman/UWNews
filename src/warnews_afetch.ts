

    

    // load buttons
    const button1 = document.querySelector("#button1") as HTMLButtonElement;
    const button2 = document.querySelector("#button2") as HTMLButtonElement;   
    const button3 = document.querySelector("#button3") as HTMLButtonElement;
    const button4 = document.querySelector("#button4") as HTMLButtonElement;   
    const button5 = document.querySelector("#button5") as HTMLButtonElement;
    const button6 = document.querySelector("#button6") as HTMLButtonElement;   

    // title of chosen news outlet
    let divTitle: string;
    let outletImg: string;

    // searchField.value = user provided search string
    let searchField = document.querySelector("#searchField") as HTMLInputElement;
   
    // search results DIV (number of movies containing that search phrase)
    let searchResults = document.querySelector("#searchResults") as HTMLDivElement;
    let divContent = document.querySelector("#content") as HTMLDivElement;

     // loading GIF
     let loadingGIF = document.querySelector("#loading") as HTMLDivElement;
   
           

    async function getNews(outlet: string) {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f2e9364cb5msh4871bf96e730354p1564fajsnef80add6fcd2',
                'X-RapidAPI-Host': 'russia-ukraine-war-news.p.rapidapi.com'
            }
        };
    


        const response = await fetch('https://russia-ukraine-war-news.p.rapidapi.com/news' + outlet, options);
        const data = await response.json();
        console.log(data);
        return data;

  
 /*
        fetch('https://russia-ukraine-war-news.p.rapidapi.com/news', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));  

           */


    }

    function presentNews(outlet: string) {

        // Reset the news array
        newsObject.article = [];
        divContent.innerHTML = '';

        loadingGIF.style.display = "block"; // show loadingGIF for a minimum of 1000 miliseconds (see setTimeout below)    

        getNews(outlet).then((data: any) => {
                
            loadingGIF.style.display = "none"; // hide loadingGIF when finished loading


            
            // Save the first 10 results in movieObject
            let newArticle: newsTypes;

            for (let key in data) {
                    newArticle = { 
                    source: data[key].source, 
                    title: data[key].title, 
                    url: data[key].url, 
                }
                newsObject.article.push(newArticle);
            }


            let news: string = '';

            for (let n in newsObject.article) { 

                news = news + `<div style="margin-top: 10px; border: 1px solid #aaa; padding: 10px;"><p>${newsObject.article[n].title}<a href="${newsObject.article[n].url}" target="_blank"><br><br>Go to article &rarr;</a></p></div>`;
                
            }

            divContent.innerHTML = "<img src='images/" + outletImg + "' style='height: 90px;'>" + news;
            //divContent.innerHTML = "<h2 style='font-size: 22px; font-family: arial;'>" + divTitle + "</h2>" + news;

            
        });     

    }


    // newsObject type pattern
    interface newsObject {
        article: Array<newsTypes>;
      }

      // newsTypes type pattern
      interface newsTypes {
        source: string;
        title: string;
        url: string;
      } 

    // News object to save news-articles in, using type-pattern newsObject
    const newsObject: newsObject = {      
        article: []
    }


    button1.addEventListener('click', function(event) {
        event.preventDefault();
        divTitle = "The Guardian";
        outletImg = "guardian.png";
        presentNews('/guardian');
    });

    button2.addEventListener('click', function(event) {
        event.preventDefault();
        divTitle = "Aljazeera";
        outletImg = "aljazeera.png";       
        presentNews('/Aljazeera');
    });


    button3.addEventListener('click', function(event) {
        event.preventDefault();
        divTitle = "The Independent";
        outletImg = "independent.png";       
        presentNews('/Independent');
    });

    button4.addEventListener('click', function(event) {
        event.preventDefault();
        divTitle = "Times of India";
        outletImg = "timesofindia.png";        
        presentNews('/Times of India');
    });

    
    button5.addEventListener('click', function(event) {
        event.preventDefault();
        divTitle = "The Hindu";
        outletImg = "thehindu.webp";
        presentNews('/The Hindu');
    });

    button6.addEventListener('click', function(event) {
        event.preventDefault();
        divTitle = "ABC News";
        outletImg = "abcnews.png";
        presentNews('/Abc News');
    });



    // /Independent
    // /Times of India
    // The Hindu
    // Abc News


    // ### BOTTEN SLASK ##################
    //console.log(data); 
   //getMovie(searchInput);
   // JSON.stringify(xxx);


    


     
   
    


