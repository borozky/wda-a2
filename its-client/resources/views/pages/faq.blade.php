@extends("shared.layout")


@section("site-content")
    <h2>Frequently Asked Questions</h2>

    <ul class="table-of-contents">
        <li><a href="#how-to-submit-a-ticket">How to submit a ticket?</a></li>
        <li><a href="#what-happens-when-i-submit-a-ticket">What happens when I submit a ticket?</a></li>
        <li><a href="#what-information-are-required-when-submitting-a-ticket">What information are required when submitting a ticket?</a></li>
        <li><a href="#who-manages-the-tickets">Who manages the tickets?</a></li>
        <li><a href="#how-can-i-access-my-previous-tickets">How can I access my previous tickets?</a></li>
        <li><a href="#how-much-time-will-it-take-before-a-reply">How much time will it take before a reply?</a></li>
        <li><a href="#sometimes-errors-appear-in-the-webpage-what-should-i-do">Sometimes errors appear in the webpage. What should I do?</a></li>
        <li><a href="#more-information">To whom should I ask for more information?</a></li>
    </ul>

    <hr>

    <h4 id="how-to-submit-a-ticket">How to submit a ticket?</h4>
    <p>
        If you are on the mobile. you can click the "+ Create a ticket" button at the top of your browser. <br/>
        If you are on a desktop, simply click the "Create a ticket" button on the navigation bar.<br/>
        You can also click <a href="{{ url('/tickets/create') }}">here</a> to create a new ticket
    </p>
    <br/>

    <h4 id="what-happens-when-i-submit-a-ticket">What happens when I submit a ticket?</h4>
    <p>
        All tickets issued will be sent to ITS staff members. You will also receive a copy of your ticket. You will also receive replies via email.
    </p>
    <br>

    <h4 id="what-information-are-required-when-submitting-a-ticket">What information are required when submitting a ticket?</h4>
    <p>When submitting a ticket, the required information are the following:</p>
    <p>
        <ul>
            <li>Email address</li>
            <li>First name</li>
            <li>Last name</li>
            <li>Your message</li>
        </ul>
    </p>
    <p>
        Software issues and operating system used are optional fields. It is recommended that you also provide those fields so that the ITS staff can easily solve your issues
    </p>
    <br/>

    <h4 id="who-manages-the-tickets">Who manages the tickets?</h4>
    <p>
        Tickets are manages by ITS staff. Other personel such as tutors, teachers and other students might come to help out.
    </p>
    <br/>

    <h4 id="how-can-i-access-my-previous-tickets">How can I access my previous tickets?</h4>
    <p>
        You can access your ticket by logging in...<br/>
        <p class="alert alert-danger"><b>Note: </b>Our ITS ticketing's login system is not yet complete as it is currently in the <b>pilot stage</b>. Please avoid putting sensitive information in your tickets</p>
    </p>
    <br/>

    <h4 id="how-much-time-will-it-take-before-a-reply">How much time will it take before a reply?</h4>
    <p>Replies should arrive within 48 hours. During busy weeks (around week 6-12), replies may take up to 3 days. If there is no reply within 5 days, we suggest that you contact the help desk. 0421567011 staff@rmit.edu.au</p>
    <br/>

    <h4 id="sometimes-errors-appear-in-the-webpage-what-should-i-do">Sometimes, errors appear in the webpage. What should I do?</h4>
    <p>Please take a screenshot and additional details of the errors to our staff email (staff@rmit.edu.au). You can press <code>Print Screen</code> key if you are using Linux/Windows based keyboard or press <code>Cmd + Shift + 4</code> if you are using Mac based keyboard</p>
    <br/>

    <h4 id="more-information">Where can I find more information?</h4>
    <p>For more information about this web application, please visit <a href="https://rmit.edu.au" target="_blank"><i class="fa fa-external-link"></i>&nbsp; RMIT website</a></p>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
@endsection