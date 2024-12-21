
async function searchAuthor() {
    const authorName = document.getElementById('author name').value.trim();

    if (!authorName) {
        alert("Please enter an author's name");    
        return;
    }

    const url = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(authorName)}`
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.numFound === 0) {
            alert('No authors found. Please recheck and try once again!');
            return;
        }

        displayAuthors(data.docs);
    } catch (error) {
        console.error('Error fetching data from OpenLibrary:', error);
        alert('Oops, an error occured while fetching data!');
    }    

    function displayAuthors(authors) {
        const authorListDiv = document.getElementById('author-list');
        authorListDiv.innerHTML= '';
        
        authors.forEach(author => {
            const authorItem=document.createElement('div');
            authorItem.classList.add('author-item');

            const name = author.name || 'No name available'; 
            const birthDate = author.birth_date || 'No birth date available';
            const worksCount = author.work_count || 'Not available';
            const topWork = author.top_work ? author.top_work : 'No top work available';
            const alternateNames = author.alternate_names ? author.alternate_names.join(', ') : 'No alternate names available';
            const topSubjects = author.top_subjects ? author.top_subjects.join(', ') : 'No top subjects available';
            const ratingsAverage = author.ratings_average ? author.ratings_average : 'Uh-oh our data shows it is 0';
            const want_to_read_count = author.want_to_read_count ? author.want_to_read_count : 'Uh-oh our data shows it is 0';
            const already_read_count = author.already_read_count ? author.already_read_count : 'Uh-oh our data shows it is 0';
            const currently_reading_count = author.currently_reading_count ? author.currently_reading_count : 'Uh-oh our data shows it is 0';
            const readinglog_count = author.readinglog_count ? author.readinglog_count : 'Uh-oh our data shows it is 0';

            if (name && worksCount !== 'Not available') {
               authorItem.innerHTML = `
                    <h4> 
                      Showing all relevant results for ${authorName}!
                    </h4>
                    <br> <br>  
                    <h3>
                     ${name}
                    </h3> 
                    <br><br>
                    <h4> 
                      General Information
                    </h4>  
                    <p class="geninfo">
                      Born: ${birthDate}
                    </p>
                    <br>
                    <p class="geninfo">
                      Number of works: ${worksCount}
                    </p>
                    <br>
                    <p class="geninfo">
                      Top Work: ${topWork}
                    </p>
                    <br>
                    <h4>
                       Also known as
                    </h4>   
                    <p class="altnames">
                      Alternate Names: ${alternateNames}
                    </p>
                    <br>
                    <h4 class="top subjects">
                      Top Subjects
                    </h4>  
                    <p class="Top subjects">
                      Top Subjects: ${topSubjects}
                    </p>
                    <br>
                    <h4>
                       Ratings average
                    </h4>   
                    <p class="Ratings average">
                      Ratings Average: ${ratingsAverage}
                    </p>
                    <br>
                    <h4>
                       Information about readers
                    </h4>   
                    <p class="reader info">
                      Want to read count: ${want_to_read_count}
                    </p>
                    <br>
                    <p class = "reader info">
                      Already read count: ${already_read_count}
                    </p>
                    <br>
                    <p class = "reader info">
                      Currently reading count: ${currently_reading_count}
                    </p>
                    <br>
                    <p class = "reader info">
                      Reading Log Count: ${readinglog_count}
                    </p>


                `;
            
               authorListDiv.appendChild(authorItem);
            }
        });
    }

}

