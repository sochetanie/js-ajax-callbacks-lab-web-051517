$(document).ready(function (){
})

function searchRepositories() {
   let baseUrl = 'https://api.github.com/search/repositories?q='
   let search = $('#searchTerms').val()
   $('#searchTerms').val('')
 
       $.get(`${baseUrl}${search}`, function(data) {
        let result = data.items.map(x => 

            `<h2><a href="${x.html_url}">${x.name}</a></h2>
             <br><a href="#" data-repository="${x.name}" data-owner="${x.owner.login}" onclick="showCommits(this)">Show Commits</a>`).join('')

            $('#results').html(result)
        }).fail(x => { displayError() })
 }

function showCommits(x) {
    let repository = x.dataset.repository
    let owner = x.dataset.owner

        $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, function(data){
         let commits = data.map(x => `
            
            <ul>
                <li>${x.sha}<br>
                    <u><b>Author</u>: </b>${x.commit.author.name}<br>
                    <u><b>Message</u>: </b>${x.commit.message}</li>
            </ul>`).join('')

            $("#details").html(commits)
        }).fail(x => { displayError() })
}

function displayError() {
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

    // https://api.github.com/search/repositories?q=hello-world-ruby-ruby-intro-000