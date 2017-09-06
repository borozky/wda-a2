@extends("shared/layout")


@section("site-content")
    <h2>Home</h2>
    <p style="font-size: 16px;">Welcome to new version of ITS Ticketing System.</p>
    <hr/>
    <p>ITS staff members have built a new version because of your feedback about usability and design of our old ITS helpdesk system.</p>
    <p>In this new version, many usability and design aspect are addressed</p>
    <p>
        <ul>
            <li>Users can now create a ticket with a click of a button.</li>
            <li>Links are now underlined to help determine which links to click.</li>
            <li>Instead of digging through the application through links and layers, ticket submission is now done with a simple form.</li>
            <li>The new ticketing system is now mobile friendly.</li>
        </ul>
    </p>
    <p>
        You can visit our old ITS ticketing system by clicking <a href="http://rmit.service-now.com/serviceandsupport/">here</a>. 
    </p>
    <p><br/></p>

    <h4>Ticket submissions</h4>
    <p>
        Currently this application is in <i><b>pilot stage</b></i>, meaning it is only open for evaluation purposes only. 
        Unless you are an evaluator, please do not create new ticket submissions.<br/><br/>
        Otherwise click on the "Create new ticket" below to get started.
    </p>
    <p>
        <a href="{{ url('tickets/create') }}" class="btn btn-success">Create new ticket</a>
    </p>
    <p><br/><br/><br/><br/><br/></p>
@endsection