<div id="SearchResults">
    <h4>Search results for {{ request()->input("search") }}</h4>
    
    @if(isset($results) && !empty($results))
    <table class="results">
        
    </table>
    @else
        <p>There are no results found</p>
    @endif
</div>