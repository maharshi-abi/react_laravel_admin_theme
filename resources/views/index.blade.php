<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Admin</title>
    <!-- Styles -->
    <link rel="shortcut icon" href="{{ asset('assets/images/favicon.svg') }}" type="image/x-icon">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <style>
        li.sidebar-item :hover {
            text-decoration: none;
        }
        a.sidebar-link.active {
            background: #e6f0fb;
        }
        .sidebar-wrapper .sidebar-header img {
            height: 6.5rem !important;
        }
        .sidebar-wrapper .sidebar-header {
            padding: 1rem 2rem 0rem !important;
        }
        #main {
            background-color: #e6f0fb !important;
        }
    </style>
</head>
<body>
    <div id="index"></div>
    <script src="{{ asset('js/app.js') }}"></script>
    <script>
        $(document).on('click','.navbar-toggler-icon',function(){
            $('#sidebar').toggleClass("active");
        });

        window.onload = function () {
            const w = window.innerWidth;
            if (w < 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        };

        $(".alert").fadeTo(2000, 500).slideUp(500, function(){
            $(".alert").alert('close');
        });

    </script>
</body>
</html>
