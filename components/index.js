let index = `

<html>
<head>
    <link rel="stylesheet" type="text/css" href="./css/main.css">
    <!-- 
        <script src="./js/components.js"></script>
        <script src="./js/controller.js"></script>
        <script src="./js/model.js"></script>
        <script src="./js/view.js"></script>
        <script src="./js/main.js"></script> -->

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>


<body>
    <!-- <div id="app"></div> -->
    <div id="header"></div>

    <div id="menu" class=" d-flex justify-content-around">
        <button onclick="loadPage('/today')" class="btn btn-danger">
            <i class="fa fa-calendar-day mr-3"></i>Kết quả hôm nay
        </button>

        <button onclick="loadPage('/past')" class="btn btn-success">
            <i class="fas fa-book-open mr-3"></i>Sổ kết quả
        </button>
    </div>

    <div id="content" class="container" >
    </div>

    <!-- <nav id="footer" class="navbar navbar-expand-sm bg-white navbar-dark fixed-bottom">
            input text here
    </nav> -->

    <script>
        function loadPage(page) {
            $.get( page, function( data ) {
                $( "#content" ).html( data );
              });
        }
        window.onload = loadPage('/today')
    </script>
</body>

</html>
`

module.exports = index