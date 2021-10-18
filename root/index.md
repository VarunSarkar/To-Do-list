<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
    <title>To-Do Tickets</title>
</head>
<body>
    <header>
        <div class="color-selector-container">
            <div class="color selector">
                <div class="pink"></div>
            </div>
            <div class="color selector">
                <div class="blue"></div>
            </div>
            <div class="color selector">
                <div class="green"></div>
            </div>
            <div class="color selector">
                <div class="black"></div>
            </div>

        </div>
        <div class="add-cross-selector-container">
            <div class="add selector">
                <i class="fas fa-plus tool_icons"></i>
            </div>
            <div class="cross selector">
                <i class="fas fa-times tool_icons"></i>
            </div>
            
        </div>

        <div class="lock-unlock_container">
            <div class="lock-container selector">
                <i class="far fa-lock tool_icons"></i>
            </div>
            <div class="unlock-container active selector">
                <i class="far fa-lock-open tool_icons"></i>
            </div>
        </div>
        
        
    </header>
    <div class="main-container">
        <div class="modal">
            <div><i class="far close fa-times-circle"></i></div>
            <div class="modal-container">
                <textarea class="task_input" placeholder="Enter task here..."></textarea>
            </div>
            
            <div class="modal-selector">
                <div class="selector mColor">
                    <div class="pink"></div>
                </div>
                <div class="selector mColor">
                    <div class="blue"></div>
                </div>
                <div class="selector mColor">
                    <div class="green"></div>
                </div>
                <div class="selector mColor">
                    <div class="black"></div>
                </div>
            </div>
        </div>
    <script src=
    "https://cdn.jsdelivr.net/npm/short-unique-id@latest/dist/short-unique-id.min.js"></script>
    <script src="script.js"></script>
    </div>
</body>
</html>