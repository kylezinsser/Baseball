$(document).ready(function(){
    // overal wins and losses will be stored here for the rank calculations
    const overall_win_loss = [];

    // query the api link to get season statistics
    const api_url = "https://api.mobileqa.mlbinfra.com/api/interview/v1/records";

    // getJSON is just a JQuery shorthand for an AJAX call
    // upon success it will callback the sort function, otherwise it will print an error message
    $.getJSON(api_url, sort_data).fail(function(){
        $('h1').text('JSON request failed');
        $('table').hide();
    });

    // here we are sorting by league, then division, then win/loss ratio
    function sort_data(data){
        data.sort(function(a, b){
            // these variables aren't necessary, but I used them to help the return statement be more readable
            let win_loss_a = a.wins/a.losses;
            let win_loss_b = b.wins/b.losses;

            // each condition is compared in order of relevance
            // localeCompare is used instead of comparison operators to ensure accurate comparisons
            return a.league.localeCompare(b.league) || a.division.localeCompare(b.division) || (win_loss_b - win_loss_a);
        });
        // once the data object is sorted, we can then populate the table 
        populate_tables(data);
    }

    // main function for generating dynamic content
    function populate_tables(data) {
        // for each new division we'll have to insert an identical Team/Wins/Losses row so we'll hold that string in a constant
        const keys_subheader = "<tr class='keys_subheader'><th>Team</th><th>Wins</th><th>Losses</th></tr>";
        let division_name = "";
        let division_index = -1;

        // now that the data is in the correct order, we can loop through and insert row by row
        $.each(data, function(i, team_data){
            // the division_id will combine league+division into a tag we can target to update the ranks
            let division_id = team_data.league + '-' + team_data.division;

            // if the division for the current team doesn't match the previous division, insert a new subheader row
            let division_subheader = "";
            if(division_name != team_data.division){
                division_subheader = "<tr class='division_subheader'><th colspan='3'>" + team_data.division + "<span id='" + division_id + "'></span></th></tr>";
                division_name = team_data.division;

                // we will store wins and losses into a separate object for calculating overal rankings
                overall_win_loss.push({'division_id': division_id, 'wins': 0, 'losses': 0});
                division_index++;
            }

            // this should always be true, but the if statement should ensure no undefined array property errors
            if(division_index > -1){
                overall_win_loss[division_index]['wins'] += team_data.wins;
                overall_win_loss[division_index]['losses'] += team_data.losses;
            }

            let target_table = team_data.league == "AL" ? "#american_table" : "#national_table";

            // if division_subheader isn't blank, insert new division and column subheaders
            if(division_subheader){
                $(target_table + ' tbody').append(division_subheader);
                $(target_table + ' tbody').append(keys_subheader);
            }

            // output the desired data to a new row
            let output = "<tr><td>" + team_data.team + "</td><td>" + team_data.wins + "</td><td>" + team_data.losses + "</td></tr>";
            $(target_table + ' tbody').append(output);
        });
        
        // hide the loading icons now that the tables are populated
        $('.loading_wrapper').hide();

        // finally we can assign the overall rankings for each division now that all the data is displayed
        assign_ranks();
    }

    function assign_ranks() {
        // just like we sorted the original dataset, we will sort this one except by W/L ratio only
        overall_win_loss.sort(function(a, b){
            let win_loss_a = a.wins/a.losses;
            let win_loss_b = b.wins/b.losses;
            return (win_loss_b - win_loss_a);
        });

        // the array is now sorted from highest to lowest rank, so we can update each rank span with the proper number
        $.each(overall_win_loss, function(i, division_stats){
            $('#' + division_stats.division_id).text('#' + (i+1));
        });
    }
});