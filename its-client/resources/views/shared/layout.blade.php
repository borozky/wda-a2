<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield("title", "ITS Ticketing System")</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        @yield("head-scripts")
    </head>
    <body>
        <div class="site-wrapper">

            <div class="site-header">
                @include("shared.site-header")
            </div>

            <div class="site-main">

                @include("shared.alerts")

                @yield("entry-header")

                <div class="container">
                    <div class="site-content">
                        @yield("site-content")
                    </div>
                </div>
            </div>

            <div class="site-footer">
                @include("shared.site-footer")
            </div>

        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
        @yield("footer-scripts")
    </body>
</html>