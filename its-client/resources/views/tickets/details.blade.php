@extends("shared.layout")

@section("title", "Ticket Details - ITS Ticketing System")

@section("site-content")
<div id="TicketDetailsArea">

    <br/>
    
    @include("errors.validation-errors")
    
    @if(isset($ticket) && !empty($ticket))

        <h4>Subject: {{ strip_tags($ticket->subject) }}</h4>

        <div class="row">
            <div class="col-xs-12 col-sm-4">
                <div class="ticket-information">
                    From: {{ $ticket->user->fullname }}  &lt;<a href="mailto:{{ $ticket->email }}">{{ $ticket->user->email }}</a>&gt;<br/>
                    @if( ! empty($ticket->operating_system))
                        OS: {{ $ticket->operating_system }} <br/>
                    @endif
                    @if(! empty($ticket->software_issue))
                        Issue: {{ $ticket->software_issue }} <br/>
                    @endif
                    <br/>
                    Status: <span class="status-{{ str_replace(' ', '_', strtolower($ticket->status)) }}">{{ ucwords($ticket->status) }}</span><br/>
                </div>
            </div>

            <!--
            <div class="col-xs-12 col-sm-8">
                <form action="{{ url('/tickets/' . $ticket->id . '/updateTicketStatus') }}" method="POST">
                    {{ csrf_field() }}
                    {{ method_field("PUT") }}
                    <div class="ticket-actions">
                        <label>Mark ticket as</label><br />
                        <input type="hidden" name="ticket_id" value="{{ $ticket->id }}"/>
                        <input type="submit" name="status" value="pending" class="btn btn-xs status-pending"/>
                        <input type="submit" name="status" value="in progress" class="btn btn-xs status-in_progress"/>
                        <input type="submit" name="status" value="unresolved" class="btn btn-xs status-unresolved"/>
                        <input type="submit" name="status" value="resolved" class="btn btn-xs status-resolved"/><br/><br/>
                    </div>
                </form>
            </div>
            -->
            
        </div>
        
        <div class="row">
            <div class="col-xs-12">
                <div class="ticket-details">
                    {!! $ticket->details !!}
                </div>
                <small class="created_at">Created: {{ $ticket->created_at->diffForHumans() }}</small>
            </div>
        </div>

        <hr/>
        
        <div class="ticket-comments">
            <b>Comments</b><br/>
            @if( count($ticket->comments) > 0) 
                <ul class="comments">
                    @foreach($ticket->comments()->orderBy("created_at", "DESC")->get() as $comment)
                        <li class="comment">
                            <span class="commenter">By: {{ $comment->commentor_fullname }}</span> - <small><i>{{ $comment->created_at->diffForHumans() }}</i></small>
                            <div class="comment-details">{!! $comment->details !!}</div>
                        </li>
                    @endforeach
                </ul>
            @else
                <span class="ticket-comment-emptymessage">There are no comments for this ticket</span>
            @endif
        </div>
        
        <hr/>
        
        <!--
        <form method="POST" action="{{ url('/tickets/' . $ticket->id . '/comments') }}" id="AddCommentForm">
            {{ csrf_field() }}
            <input type="hidden" name="ticket_id" value="{{ $ticket->id }}">

            <h4>Add Comment</h4>

            <table>
                <tr>
                    <td><label for="TicketCommenter">Email</label></td>
                    <td><input type="email" name="email" value="{{ old('email', '') }}" required="required"></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <label for="TicketComment">Comment</label><br/>
                        <textarea name="details" id="TicketComment" rows="5" required="required" minlength="10">{{ old('details', '') }}</textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" value="Add comment" class="btn btn-success">
                    </td>
                </tr>
            </table>
        </form>
        -->
        
    @endif
</div>
@endsection

@section("footer-scripts")
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
    <script>
        $(document).ready(function(){
            $("#AddCommentForm").validate();
        });
    </script>
@endsection
