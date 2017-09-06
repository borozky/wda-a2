@section("title", "Search Ticket - ITS Ticketing System")

@extends("shared.layout")

@section("site-content")
<div id="TicketSearchArea">
    
    <h1>Search a ticket</h1>
    
    <form action="{{ action('TicketsController@search') }}" method="GET">
        <input type="text" name="search" value="{{ old('search', '') }}" />
        <input type="submit" value="Search"/>
    </form>
    
    @if(request()->has("search"))
        @include("tickets._search-results")
    @endif
</div>
@endsection