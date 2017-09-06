<nav class="navbar">
    <div id="Navtop">
        <div class="container clearfix">
            <ul id="Navtop-left" class="hidden-xs">
                <li><a href="{{ url('/') }}">Home</a></li>
                <li><a href="{{ url('/faq') }}">FAQ</a></li>
            </ul>
            <ul id="Navtop-right">
                @if (Auth::guest())
                    <li>You are not logged in 
                        <a href="{{ route('login') }}" class="btn btn-xs btn-default pull-right" id="AccountAction"><i class="fa fa-user"></i>&nbsp; Login</a>&nbsp;
                        <a href="{{ route('register') }}" class="btn btn-xs pull-right" id="RegisterButton"><i class="fa fa-user"></i>&nbsp; Register</a>
                    </li>
                @else
                    <li>
                        Welcome, {{ Auth::user()->fullname }}&nbsp;
                        <a href="{{ route('logout') }}" id="LogoutButton" class="btn btn-default btn-xs" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
                    </li>
                @endif
            </ul>
        </div>
    </div>
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#Navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="{{ url('/') }}" class="navbar-brand">ITS Ticketing System</a>
        </div>
        <div id="Navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="visible-xs"><a href="{{ url('/') }}">Home</a></li>
                <li class="visible-xs"><a href="{{ url('/faq') }}">FAQ</a></li>
                @if (Auth::user())
                <li><a href="{{ url('/tickets') }}">My tickets</a></li>
                @endif
                <li><a href="{{ url('/tickets/create') }}" id="CreateTicket" class="btn btn-success"><i class="fa fa-plus"></i>&nbsp; Create a ticket</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>