@extends("shared.layout")
@section("title", "All Tickets - ITS Ticketing System")

@section("entry-header")
    <div class="entry-header">
        <div class="container">
            <h3 class="entry-title">All tickets</h3>
        </div>
    </div>
@endsection

@section("site-content")
<div id="TicketsIndexArea">

    @if(isset($tickets) && !empty($tickets))
        <div class="table-responsive" style="-webkit-overflow-scrolling: touch">
            <table class="table">
                <tr>
                    <th>#</th>
                    <th>Sender</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Created</th>
                </tr>
                @foreach($tickets as $key => $ticket)
                    <tr>
                        <td>
                            <a href="{{ url('/tickets/' . $ticket->id) }}" class="ticket-id">{{ $ticket->id }}</a>
                        </td>
                        <td class="ticket-sender">
                            <b class="sender-fullname">{{ $ticket->user->fullname }}</b><br />
                            <i class="sender-email">{{ $ticket->user->email }}</i>
                        </td>
                        <td>
                            <a href="{{ url('/tickets/' . $ticket->id) }}" class="ticket-details">{{ substr(strip_tags($ticket->details), 0, 100) }}</a>
                        </td>
                        <td class="ticket-status">
                            <span class="status-{{ str_replace(' ', '_', strtolower($ticket->status)) }}">{{ $ticket->status }}</span><br/>
                        </td>
                        <td>
                            <span title="{{ $ticket->created_at->toDayDateTimeString() }}">
                            {{ $ticket->created_at->diffForHumans() }}
                            </span>
                        </td>
                    </tr>
                @endforeach
            </table>    
        </div>
    @else
        <h4>There are currently no tickets available</h4>
    @endif
</div>
@endsection
