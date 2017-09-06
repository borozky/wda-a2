<h4>Pages</h4>
<ul>
    <li><a href="{{ url('/') }}">Home Page</a></li>
    <li><a href="{{ url('/faq') }}">FAQ</a></li>
</ul>

<br/>
<h4>Actions</h4>
<ul>
    <li><a href="{{ url('/tickets/create') }}">Submit a ticket</a></li>
</ul>

<br/>
<h4>ITS Staff</h4>
<ul>
    <li><a href="{{ url('/tickets') }}">View all tickets</a></li>
    @if(session()->exists("staff_email"))
        <li><a href="{{ url('/logout') }}">Exit</a></li>
    @endif
</ul>
